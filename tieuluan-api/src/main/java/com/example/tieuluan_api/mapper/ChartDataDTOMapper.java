package com.example.tieuluan_api.mapper;

import com.example.tieuluan_api.dto.ChartDataDTO;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ChartDataDTOMapper {
    public static ChartDataDTO createTimeSeriesChart(List<String> labels, String seriesName, List<Number> data) {
        ChartDataDTO chart = new ChartDataDTO();
        chart.setLabels(labels);

        ChartDataDTO.DataSeriesDto series = new ChartDataDTO.DataSeriesDto();
        series.setName(seriesName);
        series.setData(data);

        chart.setSeries(Collections.singletonList(series));

        return chart;
    }

    public static ChartDataDTO createMultiSeriesChart(List<String> labels, List<String> seriesNames, List<List<Number>> seriesData) {
        ChartDataDTO chart = new ChartDataDTO();
        chart.setLabels(labels);

        List<ChartDataDTO.DataSeriesDto> seriesList = new ArrayList<>();
        for (int i = 0; i < seriesNames.size(); i++) {
            ChartDataDTO.DataSeriesDto series = new ChartDataDTO.DataSeriesDto();
            series.setName(seriesNames.get(i));
            series.setData(seriesData.get(i));
            seriesList.add(series);
        }

        chart.setSeries(seriesList);

        return chart;
    }

    public static List<String> generateWeeklyLabels() {
        List<String> labels = new ArrayList<>();
        for (int i = 1; i <= 4; i++) {
            labels.add("Week " + i);
        }
        return labels;
    }
}
