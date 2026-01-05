package com.example.tieuluan_api.repository;

import com.example.tieuluan_api.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByEmail(String email);

    public Optional<User> findByUsername(String username);

    @Query("select u from User u where u.id in :user")
    public List<User> findAllUsersByUserIds(@Param("user") List<Integer> userIds);

    // tìm kiếm theo username or email
    @Query("select distinct u from User u where u.username like %:query% or u.email like %:query%")
    public List<User> findByQuery(@Param("query") String query);


    // Ai đang theo dõi user {id}
    @Query("select f from User u join u.followers f where u.id = :id")
    Page<User> findFollowersOf(@Param("id") Integer id, Pageable pageable);

    // User {id} đang theo dõi ai
    @Query("select f from User u join u.following f where u.id = :id")
    Page<User> findFollowingOf(@Param("id") Integer id, Pageable pageable);

    // hien thi so luong nguoi theo doi user {id}
    @Query("select count(f) from User u join u.followers f where u.id = :id")
    long countFollowersOf(@Param("id") Integer id);

    @Query("select count(f) from User u join u.following f where u.id = :id")
    long countFollowingOf(@Param("id") Integer id);

    @Query("""
        SELECT u
        FROM User u
        WHERE u.id <> :meId
        AND u NOT IN (
            SELECT f FROM User me
            JOIN me.followers f
            WHERE me.id = :meId
        )
        ORDER BY SIZE(u.followers) DESC
    """)
    public List<User> findPopularUsers(
            @Param("meId") Integer meId,
            Pageable pageable
    );
}
