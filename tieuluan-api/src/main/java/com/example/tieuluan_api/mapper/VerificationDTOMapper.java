package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.VerificationDTO;
import com.example.tieuluan_api.entity.Verification;

public interface VerificationDTOMapper {
        public static VerificationDTO toVerificationDTO(Verification verification) {
            VerificationDTO verificationDTO = new VerificationDTO();
            verificationDTO.setStatus(verification.isStatus());
            verificationDTO.setStartedAt(verification.getStartedAt());
            verificationDTO.setEndsAt(verification.getEndsAt());
            verificationDTO.setPlanType(verification.getPlanType());
            verificationDTO.setCode(verification.getCode());
            return  verificationDTO;

    }
}
