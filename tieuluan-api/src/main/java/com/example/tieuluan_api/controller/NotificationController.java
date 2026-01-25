package com.example.tieuluan_api.controller;

import com.example.tieuluan_api.dto.NotificationDTO;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.service.notificationService.NotificationQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

        @Autowired
        private NotificationQueryService queryService;

        @GetMapping
        public List<NotificationDTO> listMyNotifications(@RequestHeader("Authorization") String jwt)throws UserException {
            return queryService.getNotificationsForCurrentUser(jwt);

    }
}
