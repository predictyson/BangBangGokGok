from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
import json
import pymysql
import pandas as pd
import warnings
import json

warnings.filterwarnings('ignore')
pd.set_option('mode.chained_assignment', None)  # 경고 off

conn = pymysql.connect(host='bbkk.site', user='root', password='bbkk1234', port=3306,
                      db='bbkk', charset='utf8',autocommit=True)
curs = conn.cursor()


@api_view(['POST'])
def cbfAPI(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user_id = body["user_id"]

    print("user_id : " + str(user_id))
    # 유저의 관심 테마가 몇개 있는지 확인
    sql = "select count(*) from interested_theme_of_user where user_id = %s"
    curs.execute(sql, user_id)
    like_count = curs.fetchone()[0]

    # 첫 회원가입시 선호하는 장르 가져오기
    genre_list = []
    theme_list = []
    sql = "select category from genre where genre_id in (select genre_id from preferred_genre_of_user where user_id = %s)"
    curs.execute(sql, user_id)
    res = curs.fetchall()

    for genre in res:
        genre_list.append(genre[0])

    print("like_count : "+str(like_count))
    print(genre_list)
    # 관심테마 : n개, 처음 선호 하는 장르 + 자신이 관심을 누른 테마들의 장르
    if (like_count > 0):
        sql = "select category from genre where genre_id in " \
              "(select genre_id from genre_of_theme where theme_id in " \
              "(select theme_id from interested_theme_of_user where user_id = %s))"
        curs.execute(sql, user_id)
        res = curs.fetchall()
        for genre in res:
            genre_list.append(genre[0])

        sql = "select theme_id from interested_theme_of_user where user_id = %s"
        curs.execute(sql, user_id)
        res = curs.fetchall()
        for theme in res:
            theme_list.append(theme[0])

    print("genre_list : " ,end = ' ')
    print(genre_list)


    df = pd.read_csv('./(MERGE) 방탈출 테마 정보_정리완료.csv', encoding='cp949')
    data = df[['지역(대)', '지역(소)', '매장명', '테마명', '장르', '난이도', '시간', '오픈일', '최소인원', '최대인원', '메인사진', '예약URL', '내용', '인원', '추천율', '유저_난이도', '유저_활동성', '유저_공포도']]

    select_theme_genre = ' '.join(genre_list)
    print(select_theme_genre)
    data.loc[data.shape[0]] = ['', '', '', 'standard', select_theme_genre, '', '', '', '', '', '', '', '', '', '', '','','']

    from sklearn.feature_extraction.text import CountVectorizer

    counter_vector = CountVectorizer(ngram_range=(1, 1))
    c_vector_genres = counter_vector.fit_transform(data['장르'])

    # 유사도값 추출(코사인 유사도)
    # 장르를 기준으로 유사도값을 계산한다
    from sklearn.metrics.pairwise import cosine_similarity

    # argsort를 이용해서 유사도가 높은 영화들의 index 추출
    similarity_genre = cosine_similarity(c_vector_genres, c_vector_genres).argsort()[:, ::-1]

    # 장르기반의 유사도를 기준으로 영화를 추천해준다
    # top=10을 없애는게 맞음. 10개 모두 내가 관심목록으로해서 제외시키면 return이 0개기 때문에 아쉬운 상황을 방지하고자 top을 없애고 나중에 뿌릴 때 몇개 뿌릴지 설정
    def recommend_theme_list(df, theme_title, top=50):
        # 특정 테마정보 뽑아내기
        target_theme_index = df[df['테마명'] == theme_title].index.values

        # 타켓테마와 비슷한 코사인 유사도값
        sim_index = similarity_genre[target_theme_index, :top].reshape(-1)

        # 본인은 제외시킴
        for seq in theme_list:
            sim_index = sim_index[sim_index != seq]
        sim_index = sim_index[sim_index != target_theme_index]

        # 추천결과 새로운 df생성, 평균평점(score)으로 정렬
        result = df.iloc[sim_index]

        return result

    # 이걸 DB에 저장하면 끄읏
    recommend_theme = recommend_theme_list(data, theme_title='standard').index.values[:10]

    print(recommend_theme)

    # recommended_theme_of_user에 넣기전 이전 데이터를 삭제해야됨
    delete_sql = "delete from recommended_theme_of_user where user_id = %s and type = 1"
    curs.execute(delete_sql, user_id)
    conn.commit()

    # recommended_theme_of_user에 새로운 데이터 넣기
    sql = "insert into recommended_theme_of_user(created_date, modified_date, type, theme_id, user_id) values (now(), now(), 1, %s, %s)"

    for theme_id in recommend_theme:
        curs.execute(sql, (theme_id, user_id))
    conn.commit()

    response = HttpResponse('CBF 추천 완료', status=200)

    return response



@api_view(['POST'])
def cfAPI(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user_id = body["user_id"]

    rating_data_sql = "SELECT user_id, theme_id, user_rating FROM review"
    theme_data_sql = "SELECT theme_id, title FROM theme"

    # 데이터 가져오기
    rating_data = pd.read_sql_query(rating_data_sql, conn)
    theme_data = pd.read_sql_query(theme_data_sql, conn)
    print(len(rating_data))
    print(len(theme_data))

    for i in range(len(theme_data)):
        theme_data.loc[i,'title'] = theme_data.loc[i,'title'] + str('_') + str(theme_data.loc[i,'theme_id'])
    #print(theme_data)

    user_movie_rating = pd.merge(rating_data, theme_data, on='theme_id')
    #print(user_movie_rating.head(2))

    '''
    아이템 기반 협업 필터링을 수행하려면 pivot table을 만들어야함
    pivot_table
    data(영화 평점 rating), index(영화 title), columns(userId)
    '''

    # 아이템 기반 협업 필터링
    theme_user_rating = user_movie_rating.pivot_table('user_rating', index='title', columns='user_id')
    #print(len(theme_user_rating))

    # 사용자 기반 협업 필터링
    user_movie_rating = user_movie_rating.pivot_table('user_rating', index='user_id', columns='title')
    #print(len(user_movie_rating))

    # NaN의 값을 가진 데이터에 fillna(0, inplace=True)을 통해 null 값을 채워준다
    theme_user_rating.fillna(0, inplace=True)
    user_movie_rating.fillna(0, inplace=True)
    #print(theme_user_rating.head(5))

    '''
    아이템 기반 협업 필터링 추천 시스템은 유사한 아이템끼리 추천을 해준다
    여기선 유사한 아이템이 평점이 비슷한 아이템이 된다
    따라서, 현재 평점이 data로 들어가 있는 상태이니까, 이 상태에서 코사인 유사도(cosine similarity)를 구하면 됨
    '''
    from sklearn.metrics.pairwise import cosine_similarity
    item_based_collabor = cosine_similarity(theme_user_rating)
    #print(theme_user_rating)
    #print(item_based_collabor)

    item_based_collabor = pd.DataFrame(data=item_based_collabor, index=user_movie_rating.columns,
                                       columns=user_movie_rating.columns)
    # print(theme_user_rating.columns)
    #print(item_based_collabor)

    '''
    자신과 일치하는 값은 유사도 1이 나오게 되니까
    어떤 영화를 시청했을 때(사용자가 어떤 영화를 보았을 때) 그 영화가 마음에 들면 그것과 비슷한 영화를 추천할 수 있겠지?
    '''

    # 개인의 평점이 반영된 추천 시스템을 구현해야됨
    # ratings_arr.dot(item_sim_arr)는 평점 * 테마 유사도
    # ratings_arr는 사용자 u의 아이템 i와 가장 유사도가 높은 Top_N개 아이템에 대한 실제 평점 벡터
    # item_sim_arr는 아이템 i와 가장 유사도가 높은 Top_N개 아이템의 유사도 벡터
    import numpy as np

    def predict_rating(ratings_arr, item_sim_arr):
        ratings_pred = ratings_arr.dot(item_sim_arr) / np.array([np.abs(item_sim_arr).sum(axis=1)])
        return ratings_pred

    # 개인화된 예측 평점 구하기
    # 평점 value와 유사도 value만 뽑아서 대입
    ratings_pred = predict_rating(user_movie_rating.values, item_based_collabor.values)
    ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=user_movie_rating.index,
                                       columns=user_movie_rating.columns)
    # 개인별로 계산된 예측 평점
    print(ratings_pred_matrix)

    # 우리가 예측한 평점과 실제 평점간의 차이를 MSE로 계산
    from sklearn.metrics import mean_squared_error
    def get_mse(pred, actual):
        # 평점이 있는 실제 영화만 추출
        pred = pred[actual.nonzero()].flatten()
        actual = actual[actual.nonzero()].flatten()
        return mean_squared_error(pred, actual)

    print('===============================================')
    print(ratings_pred)
    print('아이템 기반 모든 최근접 이웃(KNN) MSE: ', get_mse(ratings_pred, user_movie_rating.values))


    # 3개의 col까지만. 3개의 테마에 대해서 유사도가 큰 5개 선택
    top_n_items = [np.argsort(item_based_collabor.values[:, 3])[:-5:-1]]
    print(top_n_items)

    # 따라서 가장 비슷한 유사도를 가지는 테마만 유사도 벡터로 사용
    # 특정 테마와 비슷한 유사도를 가지는 테마 Top_N에 대해서만 적용 -> 시간오래걸림
    def predict_rating_topsim(ratings_arr, item_sim_arr, n):
        # 사용자-아이템 평점 행렬 크기만큼 0으로 채운 예측 행렬 초기화
        pred = np.zeros(ratings_arr.shape)

        # 사용자-아이템 평점 행렬의 테마 개수만큼 루프
        for col in range(ratings_arr.shape[1]):
            # 유사도 행렬에서 유사도가 큰 순으로 n개의 데이터 행렬의 인덱스 반환
            top_n_items = [np.argsort(item_sim_arr[:, col])[:-n - 1:-1]]
            # 개인화된 예측 평점 계산 : 각 col 테마별(1개), x명의 사용자들의 예측 평점
            for row in range(ratings_arr.shape[0]):
                pred[row, col] = item_sim_arr[col, :][top_n_items].dot(ratings_arr[row, :][top_n_items].T)
                pred[row, col] /= np.sum(item_sim_arr[col, :][top_n_items])
        return pred

    ratings_pred = predict_rating_topsim(user_movie_rating.values, item_based_collabor.values, n=2)
    print('===============================================')
    print(ratings_pred)

    # N을 적절하게 해서 오차를 줄여야됨
    print('아이템 기반 최근접 TOP-N 이웃 MSE: ', get_mse(ratings_pred, user_movie_rating.values))

    # 계산된 예측 평점 데이터는 DataFrame으로 재생성
    ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=user_movie_rating.index,
                                       columns=user_movie_rating.columns)

    #print(ratings_pred_matrix)

    username = user_id

    # 사용자가 안 먹어본 테마를 추천하자.
    def get_not_tried_theme(ratings_matrix, userId):

        # userId로 입력받은 사용자의 모든 테마 정보를 추출해 Series로 반환
        # 반환된 user_rating은 영화명(title)을 인덱스로 가지는 Series 객체
        user_rating = ratings_matrix.loc[userId, :]

        # user_rating이 0보다 크면 기존에 관란함 테마
        # 대상 인덱스를 추출해 list 객체로 만듦
        tried = user_rating[user_rating > 0].index.tolist()

        # 모든 테마명을 list 객체로 만듦
        theme_list = ratings_matrix.columns.tolist()

        # list comprehension으로 tried에 해당하는 영화는 beer_list에서 제외
        not_tried = [theme for theme in theme_list if theme not in tried]

        return not_tried

    # 예측 평점 DataFrame에서 사용자 id 인덱스와 not_tried로 들어온 테마명 추출 후
    # 가장 예측 평점이 높은 순으로 정렬
    def recomm_theme_by_userid(pred_df, userId, not_tried, top_n):
        recomm_theme = pred_df.loc[userId, not_tried].sort_values(ascending=False)[:top_n]
        return recomm_theme


    # top_n과 비슷한 맥주만 추천에 사용
    ratings_pred = predict_rating_topsim(user_movie_rating.values, item_based_collabor.values, n=5)

    # 계산된 예측 평점 데이터는 DataFrame으로 재생성
    ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=user_movie_rating.index,
                                       columns=user_movie_rating.columns)

    # 유저가 먹지 않은 테마 이름 추출
    not_tried = get_not_tried_theme(user_movie_rating, username)

    # 아이템 기반의 최근접 이웃 CF로 테마 추천
    recomm_theme = recomm_theme_by_userid(ratings_pred_matrix, username, not_tried, top_n=10)

    recomm_theme = pd.DataFrame(data=recomm_theme.values, index=recomm_theme.index,
                                columns=['예측평점'])

    # recommended_theme_of_user에 넣기전 이전 데이터를 삭제해야됨
    delete_sql = "delete from recommended_theme_of_user where user_id = %s and type = 2"
    curs.execute(delete_sql, user_id)
    conn.commit()

    # recommended_theme_of_user에 새로운 데이터 넣기
    sql = "insert into recommended_theme_of_user(created_date, modified_date, type, theme_id, user_id) values (now(), now(), 2, %s, %s)"

    for title in recomm_theme.iterrows():
        title, theme_id = title[0].split('_')
        curs.execute(sql, (theme_id, user_id))
    conn.commit()

    response = HttpResponse('CF 추천 완료', status=200)

    return response





'''
    그룹셋에 들어온 사람들을 가지고 새로운 가상의 인물을 만든다음 그 사람가지고 CF를 돌린다

    if 그룹셋에 들어온 각 사람들의 리뷰개수가 N 이하라면 유사도 측정이 정확히 안되기 때문에 CBF로 돌린다
    ==> 하이브리드 기법 적용
'''
@api_view(['POST'])
def groupsetAPI(request):


    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user_id = body["user_id"]
    print(user_id)


    # CBF, CF 판단에 필요한 리뷰 데이터 개수를 100개로 제한
    hybrid_flag = True
    sql = "select count(*) from review where user_id = %s"

    for user in user_id:
        curs.execute(sql, user)
        res = curs.fetchall()
        if (res[0][0] < 100):
            hybrid_flag = False
            break

    if (hybrid_flag == False): # CF
        rating_data_sql = "SELECT user_id, theme_id, user_rating FROM review"
        theme_data_sql = "SELECT theme_id, title FROM theme"

        # 데이터 가져오기
        rating_data = pd.read_sql_query(rating_data_sql, conn)
        theme_data = pd.read_sql_query(theme_data_sql, conn)
        print(len(rating_data))
        print(len(theme_data))

        for i in range(len(theme_data)):
            theme_data.loc[i, 'title'] = theme_data.loc[i, 'title'] + str('_') + str(theme_data.loc[i, 'theme_id'])

        user_movie_rating = pd.merge(rating_data, theme_data, on='theme_id')

        # 아이템 기반 협업 필터링
        theme_user_rating = user_movie_rating.pivot_table('user_rating', index='title', columns='user_id')
        theme_user_rating.fillna(0, inplace=True)

        merged_df = theme_user_rating.loc[:,user_id[0]]

        for i in range(1,len(user_id)):
            merged_df = pd.merge(merged_df, theme_user_rating.loc[:,user_id[i]], on='title', how='outer')


        merged_df['user_rating'] = merged_df[user_id[0]] + merged_df[user_id[1]]

        for i in range(2, len(user_id)):
            merged_df['user_rating'] += merged_df[user_id[2]]

        merged_df['user_rating'] /= len(user_id)
        merged_df['user_rating'] = round(merged_df['user_rating'], 2)

        theme_user_rating['standard'] = merged_df['user_rating']
        #print(theme_user_rating)

        # 사용자 기반 협업 필터링
        user_movie_rating = user_movie_rating.pivot_table('user_rating', index='user_id', columns='title')
        user_movie_rating.fillna(0, inplace=True)

        merged_df = merged_df.T
        user_movie_rating.loc['standard'] = merged_df.loc['user_rating']
        #print(user_movie_rating)

        from sklearn.metrics.pairwise import cosine_similarity
        item_based_collabor = cosine_similarity(theme_user_rating)
        # print(theme_user_rating)
        # print(item_based_collabor)

        item_based_collabor = pd.DataFrame(data=item_based_collabor, index=user_movie_rating.columns,
                                           columns=user_movie_rating.columns)
        # print(theme_user_rating.columns)
        # print(item_based_collabor)

        '''
        자신과 일치하는 값은 유사도 1이 나오게 되니까
        어떤 영화를 시청했을 때(사용자가 어떤 영화를 보았을 때) 그 영화가 마음에 들면 그것과 비슷한 영화를 추천할 수 있겠지?
        '''

        # 개인의 평점이 반영된 추천 시스템을 구현해야됨
        # ratings_arr.dot(item_sim_arr)는 평점 * 테마 유사도
        # ratings_arr는 사용자 u의 아이템 i와 가장 유사도가 높은 Top_N개 아이템에 대한 실제 평점 벡터
        # item_sim_arr는 아이템 i와 가장 유사도가 높은 Top_N개 아이템의 유사도 벡터
        import numpy as np

        def predict_rating(ratings_arr, item_sim_arr):
            ratings_pred = ratings_arr.dot(item_sim_arr) / np.array([np.abs(item_sim_arr).sum(axis=1)])
            return ratings_pred

        # 개인화된 예측 평점 구하기
        # 평점 value와 유사도 value만 뽑아서 대입
        ratings_pred = predict_rating(user_movie_rating.values, item_based_collabor.values)
        ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=user_movie_rating.index,
                                           columns=user_movie_rating.columns)
        # 개인별로 계산된 예측 평점
        print(ratings_pred_matrix)

        # 우리가 예측한 평점과 실제 평점간의 차이를 MSE로 계산
        from sklearn.metrics import mean_squared_error
        def get_mse(pred, actual):
            # 평점이 있는 실제 영화만 추출
            pred = pred[actual.nonzero()].flatten()
            actual = actual[actual.nonzero()].flatten()
            return mean_squared_error(pred, actual)

        print('===============================================')
        print(ratings_pred)
        print('아이템 기반 모든 최근접 이웃(KNN) MSE: ', get_mse(ratings_pred, user_movie_rating.values))

        # 3개의 col까지만. 3개의 테마에 대해서 유사도가 큰 5개 선택
        top_n_items = [np.argsort(item_based_collabor.values[:, 3])[:-5:-1]]
        print(top_n_items)

        # 따라서 가장 비슷한 유사도를 가지는 테마만 유사도 벡터로 사용
        # 특정 테마와 비슷한 유사도를 가지는 테마 Top_N에 대해서만 적용 -> 시간오래걸림
        def predict_rating_topsim(ratings_arr, item_sim_arr, n):
            # 사용자-아이템 평점 행렬 크기만큼 0으로 채운 예측 행렬 초기화
            pred = np.zeros(ratings_arr.shape)

            # 사용자-아이템 평점 행렬의 테마 개수만큼 루프
            for col in range(ratings_arr.shape[1]):
                # 유사도 행렬에서 유사도가 큰 순으로 n개의 데이터 행렬의 인덱스 반환
                top_n_items = [np.argsort(item_sim_arr[:, col])[:-n - 1:-1]]
                # 개인화된 예측 평점 계산 : 각 col 테마별(1개), x명의 사용자들의 예측 평점
                for row in range(ratings_arr.shape[0]):
                    pred[row, col] = item_sim_arr[col, :][top_n_items].dot(ratings_arr[row, :][top_n_items].T)
                    pred[row, col] /= np.sum(item_sim_arr[col, :][top_n_items])
            return pred

        ratings_pred = predict_rating_topsim(user_movie_rating.values, item_based_collabor.values, n=2)
        print('===============================================')
        print(ratings_pred)

        # N을 적절하게 해서 오차를 줄여야됨
        print('아이템 기반 최근접 TOP-N 이웃 MSE: ', get_mse(ratings_pred, user_movie_rating.values))

        # 계산된 예측 평점 데이터는 DataFrame으로 재생성
        ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=user_movie_rating.index,
                                           columns=user_movie_rating.columns)

        # print(ratings_pred_matrix)

        username = 'standard'

        # 사용자가 안 먹어본 테마를 추천하자.
        def get_not_tried_theme(ratings_matrix, userId):

            # userId로 입력받은 사용자의 모든 테마 정보를 추출해 Series로 반환
            # 반환된 user_rating은 영화명(title)을 인덱스로 가지는 Series 객체
            user_rating = ratings_matrix.loc[userId, :]

            # user_rating이 0보다 크면 기존에 관란함 테마
            # 대상 인덱스를 추출해 list 객체로 만듦
            tried = user_rating[user_rating > 0].index.tolist()

            # 모든 테마명을 list 객체로 만듦
            theme_list = ratings_matrix.columns.tolist()

            # list comprehension으로 tried에 해당하는 영화는 beer_list에서 제외
            not_tried = [theme for theme in theme_list if theme not in tried]

            return not_tried

        # 예측 평점 DataFrame에서 사용자 id 인덱스와 not_tried로 들어온 테마명 추출 후
        # 가장 예측 평점이 높은 순으로 정렬
        def recomm_theme_by_userid(pred_df, userId, not_tried, top_n):
            recomm_theme = pred_df.loc[userId, not_tried].sort_values(ascending=False)[:top_n]
            return recomm_theme

        # top_n과 비슷한 맥주만 추천에 사용
        ratings_pred = predict_rating_topsim(user_movie_rating.values, item_based_collabor.values, n=5)

        # 계산된 예측 평점 데이터는 DataFrame으로 재생성
        ratings_pred_matrix = pd.DataFrame(data=ratings_pred, index=user_movie_rating.index,
                                           columns=user_movie_rating.columns)

        # 유저가 먹지 않은 테마 이름 추출
        not_tried = get_not_tried_theme(user_movie_rating, username)

        # 아이템 기반의 최근접 이웃 CF로 테마 추천
        recomm_theme = recomm_theme_by_userid(ratings_pred_matrix, username, not_tried, top_n=10)

        recomm_theme = pd.DataFrame(data=recomm_theme.values, index=recomm_theme.index,
                                    columns=['예측평점'])

        print(recomm_theme)

        theme_info = []

        from .models import Theme_info

        for title in recomm_theme.iterrows():
            title, theme_id = title[0].split('_')
            imgUrl_sql = 'select img_url from theme where theme_id = %s'
            curs.execute(imgUrl_sql, theme_id)
            imgUrl = curs.fetchall()[0][0]


            genres_sql = "select category from genre where genre_id in (select genre_id from genre_of_theme where theme_id = %s)"
            curs.execute(genres_sql, theme_id)
            res = curs.fetchall()
            genres = []
            for genre in res:
                genres.append(genre[0])
            theme_info.append(Theme_info(theme_id, title, imgUrl, genres))


        data_list = []
        for theme in theme_info:
            temp = {'themeId': theme.themeId, 'title': theme.title, 'imgUrl' : theme.imgUrl, 'genres' : theme.genres}
            data_list.append(temp)
        res = {'themes': data_list}

        # HTTP 응답 생성
        response = Response(res, status=200)
        return response



    else: # CBF
        total_genre_list = []
        total_theme_list = []

        for user in user_id:
            # 유저의 관심 테마가 몇개 있는지 확인
            sql = "select count(*) from interested_theme_of_user where user_id = %s"
            curs.execute(sql, user)
            like_count = curs.fetchone()[0]

            # 첫 회원가입시 선호하는 장르 가져오기
            genre_list = []
            theme_list = []
            sql = "select category from genre where genre_id in (select genre_id from preferred_genre_of_user where user_id = %s)"
            curs.execute(sql, user)
            res = curs.fetchall()

            for genre in res:
                genre_list.append(genre[0])

            #print("like_count : " + str(like_count))
            #print(genre_list)

            # 관심테마 : n개, 처음 선호 하는 장르 + 자신이 관심을 누른 테마들의 장르
            if (like_count > 0):
                sql = "select category from genre where genre_id in " \
                      "(select genre_id from genre_of_theme where theme_id in " \
                      "(select theme_id from interested_theme_of_user where user_id = %s))"
                curs.execute(sql, user)
                res = curs.fetchall()
                for genre in res:
                    genre_list.append(genre[0])

                sql = "select theme_id from interested_theme_of_user where user_id = %s"
                curs.execute(sql, user)
                res = curs.fetchall()
                for theme in res:
                    theme_list.append(theme[0])


            total_genre_list += genre_list
            total_theme_list += theme_list

        print(total_genre_list)
        print(total_theme_list)

        df = pd.read_csv('./(MERGE) 방탈출 테마 정보_정리완료.csv', encoding='cp949')
        data = df[
            ['지역(대)', '지역(소)', '매장명', '테마명', '장르', '난이도', '시간', '오픈일', '최소인원', '최대인원', '메인사진', '예약URL', '내용', '인원',
             '추천율', '유저_난이도', '유저_활동성', '유저_공포도']]

        select_theme_genre = ' '.join(total_genre_list)
        print(select_theme_genre)
        data.loc[data.shape[0]] = ['', '', '', 'standard', select_theme_genre, '', '', '', '', '', '', '', '', '', '',
                                   '', '', '']

        from sklearn.feature_extraction.text import CountVectorizer

        counter_vector = CountVectorizer(ngram_range=(1, 1))
        c_vector_genres = counter_vector.fit_transform(data['장르'])

        # 유사도값 추출(코사인 유사도)
        # 장르를 기준으로 유사도값을 계산한다
        from sklearn.metrics.pairwise import cosine_similarity

        # argsort를 이용해서 유사도가 높은 영화들의 index 추출
        similarity_genre = cosine_similarity(c_vector_genres, c_vector_genres).argsort()[:, ::-1]

        # 장르기반의 유사도를 기준으로 영화를 추천해준다
        # top=10을 없애는게 맞음. 10개 모두 내가 관심목록으로해서 제외시키면 return이 0개기 때문에 아쉬운 상황을 방지하고자 top을 없애고 나중에 뿌릴 때 몇개 뿌릴지 설정
        def recommend_theme_list(df, theme_title, top=50):
            # 특정 테마정보 뽑아내기
            target_theme_index = df[df['테마명'] == theme_title].index.values

            # 타켓테마와 비슷한 코사인 유사도값
            sim_index = similarity_genre[target_theme_index, :top].reshape(-1)

            # 본인은 제외시킴
            for seq in total_theme_list:
                sim_index = sim_index[sim_index != seq]
            sim_index = sim_index[sim_index != target_theme_index]

            # 추천결과 새로운 df생성, 평균평점(score)으로 정렬
            result = df.iloc[sim_index]

            return result

        # 이걸 DB에 저장하면 끄읏
        recommend_theme = recommend_theme_list(data, theme_title='standard').index.values[:10]

        print(recommend_theme)

        theme_info = []

        from .models import Theme_info

        for theme_id in recommend_theme:
            title_sql = 'select title from theme where theme_id = %s'
            curs.execute(title_sql, theme_id)
            title = curs.fetchall()[0][0]

            imgUrl_sql = 'select img_url from theme where theme_id = %s'
            curs.execute(imgUrl_sql, theme_id)
            imgUrl = curs.fetchall()[0][0]

            genres_sql = "select category from genre where genre_id in (select genre_id from genre_of_theme where theme_id = %s)"
            curs.execute(genres_sql, theme_id)
            res = curs.fetchall()
            genres = []
            for genre in res:
                genres.append(genre[0])


            theme_info.append(Theme_info(theme_id, title, imgUrl, genres))


        data_list = []
        for theme in theme_info:
            temp = {'themeId': theme.themeId, 'title': theme.title, 'imgUrl' : theme.imgUrl, 'genres' : theme.genres}
            data_list.append(temp)
        res = {'themes': data_list}

        # HTTP 응답 생성
        response = Response(res, status=200)
        return response