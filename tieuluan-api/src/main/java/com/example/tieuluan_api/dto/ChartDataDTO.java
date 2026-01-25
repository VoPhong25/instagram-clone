package com.example.tieuluan_api.dto;

import lombok.Data;

import java.util.List;
@Data
public class ChartDataDTO {
        private List<String> labels;
        private List<DataSeriesDto> series;
        @Data
        public static class DataSeriesDto {
            private String name;
            private List<Number> data;
    }
}
