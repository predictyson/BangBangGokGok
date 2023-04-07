package com.ssafy.bbkk.api.service;

import com.ssafy.bbkk.api.dto.GenreResponse;
import java.util.List;

public interface OtherService {

    List<GenreResponse> getGenreList() throws Exception;

    List<String> getRegionSmallList(String regionBig) throws Exception;

    void recCF(String email);

    void recCBF(String email);

}