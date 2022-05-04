<template>
    <div>
        <h1>메모</h1>
        <!--  메모의 아이디와 작성자와 제목 출력 -->
        <table>
            <tr>
                <td>아이디</td>
                <td>작성자</td>
                <td>제목</td>
            </tr>
            <tr v-for="memo in memo" :key="memo.i">
                <td>{{memo.id}}</td>
                <td>{{memo.writer}}</td>
                <!-- 타이틀을 눌렀을때 /list/:id 링크로 이동 -->
                <td @click="$router.push(`/list/${memo.id}`)">{{memo.title}}</td>

                <button @click="$router.push(`/update/${memo.id}`)">수정</button>
                <button @click="deletememo(memo.id)">삭제</button>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            //v-for로 확인하기 위해 배열
            memo : [ {
                id :'',
                title : '',
                writer : ''
            }]
        }
    },
    // 컴포지션이 처음 생성될때 값을 가져와야 화면에 출력할수 있다
    created() {
        // axios를 통해 값을 가져옴 - get
        // this.memo에 가져온 값 넣어줌
        this.$http.get('/api/memo')
        .then((response) => {
            // data를 통해서 값 가져올 수 있다.
            this.memo = response.data
        })
    },
    methods : {
        deletememo(id) {
            this.$http.delete(`/api/memo/${id}`)
            // memo.id 값을 서버로 넘겨준다
            .then( (response) => { // 데이터를 받아온다
                this.memo = response.data// 다시 화면에 뿌리기위해 데이터를 다시할당해줌

            })
        }
    }
}
</script>