package com.example.tieuluan_api.controller;
import com.example.tieuluan_api.dto.DirectMessageDTO;
import com.example.tieuluan_api.dto.UserDTO;
import com.example.tieuluan_api.dto.UserMessageDTO;
import com.example.tieuluan_api.dto.request.DirectMessageReq;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.service.DirectMessageService.MessageService;
import com.example.tieuluan_api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@RestController
@RequestMapping("/api/messages")
public class DirectMessageController {

        @Autowired
        private MessageService messageService;
        @Autowired
        private IUserService userService;

        @PostMapping("/{recipientId}")
        public ResponseEntity<DirectMessageDTO> send(
                @PathVariable Integer recipientId,
                @RequestBody DirectMessageReq body,
                @RequestHeader("Authorization") String token
        ) throws UserException {
            User me = userService.findUserProfile(token);
            DirectMessageDTO dto = messageService.sendMessage(
                    me, recipientId, body.getContent(), body.getImageUrl()
            );
            return ResponseEntity.ok(dto);
        }

        @GetMapping
        public ResponseEntity<List<UserMessageDTO>> listPartners(@RequestHeader("Authorization") String token) throws UserException {
            User me = userService.findUserProfile(token);
            return ResponseEntity.ok(messageService.listConversationPartners(me));
        }

        @GetMapping("/{otherId}")
        public ResponseEntity<List<DirectMessageDTO>> getConversation(
                @PathVariable Integer otherId,
                @RequestHeader("Authorization") String token
        ) throws UserException {
            User me = userService.findUserProfile(token);
            return ResponseEntity.ok(messageService.getConversation(me.getId(), otherId));
        }
    }

