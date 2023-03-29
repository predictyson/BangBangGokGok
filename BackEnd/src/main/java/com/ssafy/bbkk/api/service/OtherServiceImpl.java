package com.ssafy.bbkk.api.service;


import com.ssafy.bbkk.api.dto.GenreResponse;
import com.ssafy.bbkk.db.repository.GenreRepository;
import com.ssafy.bbkk.db.repository.RegionRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bind.MethodDelegationBinder.BindingResolver.StreamWriting;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@EnableAsync
@Transactional
@RequiredArgsConstructor
public class OtherServiceImpl implements OtherService {

    private final GenreRepository genreRepository;
    private final RegionRepository regionRepository;

    @Override
    public List<GenreResponse> getGenreList() throws Exception {
        List<GenreResponse> result = null;
        // 장르 목록 모두 찾아오기 및 Dto로 감싸기
        result = genreRepository.findAll()
                .stream()
                .map(x -> new GenreResponse(x))
                .collect(Collectors.toList());
        return result;
    }

    @Override
    public List<String> getRegionSmallList(String regionBig) throws Exception {
        List<String> result = null;

        if(!regionRepository.existsByRegionBig(regionBig)){
            throw new Exception("해당 지역을 찾을 수 없습니다.");
        }

        result = regionRepository.findByRegionBig(regionBig).stream()
                .map(x -> x.getRegionSmall())
                .collect(Collectors.toList());
        return result;
    }

    @Override
    @Async
    public void recCF(String email) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("email", email);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonObject.toJSONString(), httpHeaders);
        restTemplate.postForEntity("https://bbkk.store/rec/cf", httpEntity, String.class);
    }

    @Override
    @Async
    public void recCBF(String email) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("email", email);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonObject.toJSONString(), httpHeaders);
        restTemplate.postForEntity("https://bbkk.store/rec/cbf", httpEntity, String.class);
    }

}