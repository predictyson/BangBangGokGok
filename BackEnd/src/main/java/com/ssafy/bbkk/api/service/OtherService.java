package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.GenreResponse;
import com.ssafy.bbkk.api.dto.RegionResponse;

import java.util.List;

public interface OtherService {

    List<GenreResponse> getGenreList() throws Exception;
    List<RegionResponse> getRegionList() throws Exception;
}
