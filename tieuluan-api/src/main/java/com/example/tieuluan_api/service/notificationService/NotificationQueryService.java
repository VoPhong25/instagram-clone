package com.example.tieuluan_api.service.notificationService;

import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.NotificationMapper;
import com.example.tieuluan_api.repository.NotificationRepository;
import com.example.tieuluan_api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationQueryService {
    @Autowired
    private NotificationRepository repo;
    @Autowired
    private IUserService userService;

    public List<NotificationDTO> getNotificationsForCurrentUser(String jwt) throws UserException {
        User me = userService.findUserProfile(jwt);
        return repo.findByRecipientOrderByCreatedAtDesc(me).stream()
                .map(n -> NotificationMapper.toNotificationDTO(n, me))
                .collect(Collectors.toList());

    }
}
