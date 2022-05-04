<template>
    <div>
        <h1>글을 수정하는 곳입니다</h1>
        <input type="text" v-model="memo.title"> <br>
        <textarea cols="30" rows="10" v-model='memo.memo'></textarea> <br>
        <button @click="updatememo">제출</button>

        <hr>
        <h1>폼을 통해서 작성하는 곳입니다</h1>
        <form action="/api/memo/writeform/form" method="post">
            <input type="text" name="title"> <br>
            <textarea name="memo" cols="30" rows="10"></textarea><br>
            <input type="submit" value="제출">
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            memo : {
                title :'',
                memo : ''
            }
        }
    },
    created () { // 페이지 들어오면 입력해뒀던 memo값이 화면에오픈!
        this.$http.get(`/api/memo/${this.$route.params.id}`)
        .then( (response) => {
             this.memo = response.data; //배열x,->객체형식로 재할당
        })
    },
    methods : {
        // axios를 이용해 제출 버튼을 눌렀을때 수정해줌 - put
        updatememo() {
            this.$http.put('/api/memo/update',{
                data : {
                    memo : this.memo
                }
            }).then((response)=>{
                console.log(response.data)
                console.log('updatememo 메소드ok')
            });
            this.$router.push('/')
        }
    }
}
</script>