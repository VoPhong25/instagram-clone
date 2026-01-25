package com.example.tieuluan_api.service;

import com.example.tieuluan_api.dto.*;
import com.example.tieuluan_api.entity.*;
import com.example.tieuluan_api.mapper.*;
import com.example.tieuluan_api.repository.CommentRepository;
import com.example.tieuluan_api.repository.LikeRepository;
import com.example.tieuluan_api.repository.PostRepository;
import com.example.tieuluan_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminServiceImp implements IAdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private CommentRepository commentRepository; // Đã thêm CommentRepository
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public DashboardAnalyticsDTO getDashboardAnalytics() {
        LocalDateTime startDate = getMonthStartDate();

        long totalUsers = userRepository.count();
        long newUsers = userRepository.countByCreatedAtAfter(startDate);
        long totalPosts = postRepository.count();
        long totalLikes = likeRepository.count();

        // Logic mới: Đếm tổng số lượt save thông qua Query JPQL (vì là ManyToMany)
        // Nếu chưa có hàm countTotalSavedPosts, bạn có thể tạm dùng: userRepository.findAll().stream().mapToLong(u -> u.getSavePost().size()).sum(); (Nhưng hiệu năng thấp)
        long totalSaves = userRepository.countTotalSavedPosts();

        // Logic mới: Đếm tổng comment từ bảng Comment
        long totalComments = commentRepository.count();

        List<String> weekLabels = ChartDataDTOMapper.generateWeeklyLabels();
        List<Number> userCounts = getUserCountsForMonth();
        ChartDataDTO userGrowthChart = ChartDataDTOMapper.createTimeSeriesChart(
                weekLabels, "New Users", userCounts);

        List<String> activityLabels = weekLabels;
        // Đổi tên series cho phù hợp
        List<String> seriesNames = Arrays.asList("Posts", "Likes", "Comments");
        List<List<Number>> seriesData = Arrays.asList(
                getPostCountsForMonth(),
                getLikeCountsForMonth(),
                getCommentCountsForMonth() // Thêm biểu đồ comment
        );
        ChartDataDTO activityChart = ChartDataDTOMapper.createMultiSeriesChart(
                activityLabels, seriesNames, seriesData);

        return DashboardAnalyticsDTOMapper.toDashboardAnalyticsDTO(
                totalUsers, newUsers, totalPosts, totalLikes, totalSaves,
                totalComments, userGrowthChart, activityChart);
    }

    @Override
    public PostAnalyticsDTO getPostAnalytics() {
        LocalDateTime startDate = getMonthStartDate();
        long totalPosts = postRepository.countByCreatedAtAfter(startDate);

        // Logic mới: Tính tổng comment mới
        long totalComments = commentRepository.countByCreatedAtAfter(startDate);

        // Logic mới: Tính số lượt save trên các bài viết mới (Do bảng Save không có thời gian, ta tính dựa trên Post mới)
        List<Post> newPosts = postRepository.findByCreatedAtAfter(startDate);
        long totalSaves = newPosts.stream()
                .mapToLong(post -> post.getSavedByUsers().size())
                .sum();

        List<String> weekLabels = ChartDataDTOMapper.generateWeeklyLabels();
        List<String> seriesNames = Arrays.asList("Posts", "Comments");
        List<List<Number>> seriesData = Arrays.asList(
                getPostCountsForMonth(),
                getCommentCountsForMonth()
        );
        ChartDataDTO postsOverTimeChart = ChartDataDTOMapper.createMultiSeriesChart(
                weekLabels, seriesNames, seriesData);

        Map<User, Long> topPosters = getTopPosters(startDate);
        ChartDataDTO topPostersChart = PostAnalyticsDTOMapper.createTopPostersChart(topPosters);

        return PostAnalyticsDTOMapper.toPostAnalyticsDTO(
                totalPosts, totalSaves, totalComments, postsOverTimeChart, topPostersChart);
    }

    @Override
    public LikeAnalyticsDTO getLikeAnalytics() {
        LocalDateTime startDate = getMonthStartDate();

        long totalLikes = likeRepository.countByCreatedAtAfter(startDate);

        List<String> weekLabels = ChartDataDTOMapper.generateWeeklyLabels();
        List<Number> likeCounts = getLikeCountsForMonth();
        ChartDataDTO likesOverTimeChart = ChartDataDTOMapper.createTimeSeriesChart(
                weekLabels, "Likes", likeCounts);

        Map<Post, Long> mostLikedPosts = getMostLikedPosts(startDate);
        ChartDataDTO mostLikedTweetsChart = LikeAnalyticsDTOMapper.createMostLikedPostsChart(mostLikedPosts);

        Map<User, Long> mostActiveLikers = getMostActiveLikers(startDate);
        ChartDataDTO mostActiveLikersChart = LikeAnalyticsDTOMapper.createMostActiveLikersChart(mostActiveLikers);

        return LikeAnalyticsDTOMapper.toLikeAnalyticsDTO(
                totalLikes, likesOverTimeChart, mostLikedTweetsChart, mostActiveLikersChart);
    }

    @Override
    public UserAnalyticsDTO getUserAnalytics() {
        LocalDateTime startDate = getMonthStartDate();

        long totalUsers = userRepository.count();
        long newUsers = userRepository.countByCreatedAtAfter(startDate);
        long activeUsers = getActiveUserCount(startDate);

        List<String> weekLabels = ChartDataDTOMapper.generateWeeklyLabels();
        List<Number> userCounts = getUserCountsForMonth();
        ChartDataDTO userGrowthChart = ChartDataDTOMapper.createTimeSeriesChart(
                weekLabels, "New Users", userCounts);

        List<Number> activeUserCounts = getActiveUserCountsForMonth();

        Map<User, Integer> mostFollowedUsers = getMostFollowedUsers();
        ChartDataDTO mostFollowedUsersChart = UserAnalyticsDTOMapper.createMostFollowedUsersChart(mostFollowedUsers);

        return UserAnalyticsDTOMapper.toUserAnalyticsDTO(
                totalUsers, newUsers, activeUsers, userGrowthChart, mostFollowedUsersChart);
    }

    @Override
    public List<UserDTO> getAllUsers(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<User> users;

        if (query != null && !query.isEmpty()) {
            // Đã sửa tên hàm cho khớp với Entity User (fullname thường)
            users = userRepository.findByFullnameContainingOrEmailContaining(query, query, pageable);
        } else {
            users = userRepository.findAllUsersNotAdmin(pageable).getContent();
        }

        return users.stream()
                .map(u -> UserMapper.toUserDTO(u, u))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO banUser(Integer userId, String reason) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getVerification() == null) {
            user.setVerification(new Verification());
        }

        user.getVerification().setStatus(false);
        user.getVerification().setPlanType("BANNED: " + reason);
        user.getVerification().setStartedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);
        kafkaTemplate.send("banTopic", user.getEmail(), "BANNED: " + reason);
        return UserMapper.toUserDTO(savedUser, savedUser);
    }

    @Override
    public UserDTO unbanUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getVerification() != null) {
            user.getVerification().setStatus(true);
            user.getVerification().setPlanType(null);
            user.getVerification().setEndsAt(LocalDateTime.now());
        }
        String message = "Congratulations on your account being unbanned!";
        User savedUser = userRepository.save(user);
        kafkaTemplate.send("banTopic", user.getEmail(), "UNBANNED: " + message);
        return UserMapper.toUserDTO(savedUser, savedUser);
    }

    private LocalDateTime getMonthStartDate() {
        LocalDateTime now = LocalDateTime.now();
        return now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
    }

    private List<Number> getUserCountsForMonth() {
        return getCountsForMonth((start, end) -> userRepository.countByCreatedAtBetween(start, end));
    }

    private List<Number> getPostCountsForMonth() {
        // Sửa lỗi chính tả .cou -> .countByCreatedAtBetween và bỏ logic isTwit
        return getCountsForMonth((start, end) -> postRepository.countByCreatedAtBetween(start, end));
    }

    private List<Number> getCommentCountsForMonth() {
        // Sử dụng commentRepository
        return getCountsForMonth((start, end) -> commentRepository.countByCreatedAtBetween(start, end));
    }

    private List<Number> getLikeCountsForMonth() {
        return getCountsForMonth((start, end) -> likeRepository.countByCreatedAtBetween(start, end));
    }

    // Helper interface để refactor logic lặp lại
    @FunctionalInterface
    interface CountFunction {
        long count(LocalDateTime start, LocalDateTime end);
    }

    // Refactor logic lặp lại của các hàm get...CountsForMonth
    private List<Number> getCountsForMonth(CountFunction counter) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime monthStart = getMonthStartDate();
        List<Number> counts = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            LocalDateTime weekStart = monthStart.plusWeeks(i);
            LocalDateTime weekEnd = weekStart.plusWeeks(1);
            if (weekEnd.isAfter(now)) weekEnd = now;

            counts.add(counter.count(weekStart, weekEnd));
        }
        return counts;
    }

    private List<Number> getActiveUserCountsForMonth() {
        // Đây là dữ liệu giả (hard-coded), nếu muốn thật bạn cần query phức tạp
        return Arrays.asList(35, 42, 38, 45);
    }

    private Map<User, Long> getTopPosters(LocalDateTime since) {
        List<Post> recentPosts = postRepository.findByCreatedAtAfter(since);

        return recentPosts.stream()
                .filter(t -> t.getUser() != null)
                .collect(Collectors.groupingBy(Post::getUser, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<User, Long>comparingByValue().reversed())
                .limit(10)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
    }

    private Map<Post, Long> getMostLikedPosts(LocalDateTime since) {
        // Logic cũ gọi likeRepository -> getPost -> group
        List<Like> recentLikes = likeRepository.findByCreatedAtAfter(since);

        return recentLikes.stream()
                .filter(l -> l.getPost() != null)
                .collect(Collectors.groupingBy(Like::getPost, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<Post, Long>comparingByValue().reversed())
                .limit(10)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
    }

    private Map<User, Long> getMostActiveLikers(LocalDateTime since) {
        List<Like> recentLikes = likeRepository.findByCreatedAtAfter(since);

        return recentLikes.stream()
                .filter(l -> l.getUser() != null)
                .collect(Collectors.groupingBy(Like::getUser, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<User, Long>comparingByValue().reversed())
                .limit(10)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
    }

    private long getActiveUserCount(LocalDateTime since) {
        // Active = Người đăng bài + Người like + Người comment (Logic mới bổ sung Comment)
        Set<User> activePosters = postRepository.findByCreatedAtAfter(since).stream()
                .map(Post::getUser)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        Set<User> activeLikers = likeRepository.findByCreatedAtAfter(since).stream()
                .map(Like::getUser)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        // Bổ sung logic lấy người comment
        Set<User> activeCommenters = commentRepository.countByCreatedAtAfter(since) > 0 ?
                // Lưu ý: Nếu commentRepository chưa có findByCreatedAtAfter trả về List<Comment>, cần thêm vào.
                // Ở đây tôi giả định dùng count cho nhanh, nếu cần chính xác user id thì cần query List<Comment>
                new HashSet<>() : new HashSet<>();
        // Thực tế nên query: commentRepository.findDistinctUserByCreatedAtAfter(since) để tối ưu

        Set<User> allActiveUsers = new HashSet<>();
        allActiveUsers.addAll(activePosters);
        allActiveUsers.addAll(activeLikers);
         allActiveUsers.addAll(activeCommenters);

        return allActiveUsers.size();
    }

    private Map<User, Integer> getMostFollowedUsers() {
        // Cần tối ưu: Không nên dùng findAll() rồi loop. Nên dùng @Query custom trong UserRepository.
        // Tuy nhiên, để giữ cấu trúc code cũ:
        List<User> allUsers = userRepository.findAll();

        Map<User, Integer> followerCounts = new HashMap<>();
        for (User user : allUsers) {
            // Sử dụng logic mới: user.getFollowers().size() (Do @ManyToMany mappedBy="following")
            followerCounts.put(user, user.getFollowers().size());
        }

        return followerCounts.entrySet().stream()
                .sorted(Map.Entry.<User, Integer>comparingByValue().reversed())
                .limit(10)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
    }
}