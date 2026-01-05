package com.example.tieuluan_api.service.DirectMessageService;
import com.example.tieuluan_api.dto.DirectMessageDTO;
import com.example.tieuluan_api.dto.UserMessageDTO;
import com.example.tieuluan_api.entity.User;
import com.example.tieuluan_api.exception.UserException;

import java.util.List;

    public interface MessageService {
        DirectMessageDTO sendMessage(User sender, Integer recipientId, String content, String imageUrl) throws UserException;
        //Get list of users that had a conversion with req_user before
        List<UserMessageDTO> listConversationPartners(User me);
        //Get conversion with specify user
        List<DirectMessageDTO> getConversation(Integer meId, Integer otherId) throws UserException;

}
