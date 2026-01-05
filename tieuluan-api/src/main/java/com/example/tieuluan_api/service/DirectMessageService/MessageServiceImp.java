package com.example.tieuluan_api.service.DirectMessageService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

import com.example.tieuluan_api.dto.DirectMessageDTO;
import com.example.tieuluan_api.dto.UserDTO;
import com.example.tieuluan_api.dto.UserMessageDTO;
import com.example.tieuluan_api.entity.DirectMessage;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;
import com.example.tieuluan_api.mapper.DirectMessageMapper;
import com.example.tieuluan_api.mapper.UserMapper;
import com.example.tieuluan_api.repository.DirectMessageRepository;
import com.example.tieuluan_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
    @Service
    public class MessageServiceImp implements MessageService {

        private static final String TOPIC = "message";

        @Autowired private DirectMessageRepository messageRepository;
        @Autowired private UserRepository userRepository;
        @Autowired private KafkaTemplate<String, DirectMessageDTO> kafkaTemplate;

        @Override
        public DirectMessageDTO sendMessage(User sender, Integer recipientId, String content, String imageUrl) throws UserException {
            User recipient = userRepository.findById(recipientId).orElseThrow(() -> new UserException("recipient not found with id: " + recipientId));

            DirectMessage dm = new DirectMessage();
            dm.setSender(sender);
            dm.setRecipient(recipient);
            dm.setContent(content);
            dm.setImageUrl(imageUrl);
            dm.setCreatedAt(LocalDateTime.now());
            DirectMessage saved = messageRepository.save(dm);

            DirectMessageDTO dto = DirectMessageMapper.toDto(saved, sender);
            kafkaTemplate.send(TOPIC, dto);
            return dto;
        }

        @Override
        public List<UserMessageDTO> listConversationPartners(User me) {
            List<DirectMessage> all = messageRepository.findBySenderOrRecipientOrderByCreatedAtDesc(me, me);
            LinkedHashSet<UserMessageDTO> partners = new LinkedHashSet<>(); //use linkedHashSet to ensure that all partner in order and unique
            for (DirectMessage m : all) {
                UserMessageDTO other = m.getSender().equals(me)
                        ? UserMapper.toUserMessageDTO(m.getRecipient(), me)
                        : UserMapper.toUserMessageDTO(m.getSender(), me);
                partners.add(other);
            }
            return new ArrayList<>(partners);
        }

        @Override
        public List<DirectMessageDTO> getConversation(Integer meId, Integer otherId) throws UserException {
            User me = userRepository.findById(meId).orElseThrow(() -> new UserException("user not found with id: " + meId));
            List<DirectMessage> conv = messageRepository.findConversation(meId, otherId);
            return conv.stream()
                    .map(dm -> DirectMessageMapper.toDto(dm, me))
                    .collect(Collectors.toList());

    }
}
