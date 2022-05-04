var express = require("express");
var router = express.Router();
const memos = require("../memo.json");
// memos의 길이 :2
let count = memos.length;

/* 메모리스트를 보내주는 주소 */
router.get("/", function (req, res, next) {
  res.send(memos);
});

/* id 값을 통해 메모를 구분, 노출상관없음, 
   한개의 메모만 보냄 */
router.get("/:id", function (req, res, next) {
  // 파람 id값에는 memo의 id가 담겨있다
  // id값을 통해서 하나의 메모를 찾거나(find) 걸러낸다(filter)
  const id = req.params.id;

  const m = memos.filter((memo) => memo.id == id);

  res.send(m[0]);
});

// post로 받아온 값을 memos에 추가(push)
router.post("/writeform", function (req, res, next) {
  // axios로 받아왔다는 조건하에 body.data
  const memo = req.body.data;
  count++;
  const m = {
    id: count,
    title: memo.title,
    memo: memo.memo,
    writer: "익명",
  };
  memos.push(m);
  res.send("ok");
});

router.post("/writeform/form", function (req, res, next) {
  // form 태그를 통해 받아옴 (data 사용 X, 바로 body)
  const memo = req.body;
  count++;
  const m = {
    id: count,
    title: memo.title,
    memo: memo.memo,
    writer: "익명",
  };
  memos.push(m);
  res.redirect("/");
});

router.delete("/:id", function(req,res,next) {
  // params id 값과 memos id 값을 비교 -일치하는 id배열삭제 후 재할당
  const id = req.params.id;
  const index = memos.findIndex( (memo) => memo.id == id )

  memos.splice(index,1);
  res.send(memos);
});


router.put("/update", function(req,res,next) {
  const memo = req.body.data.memo; // 요청한 date의 객체{}메모를 받아옴
  console.log(memo)
  // 기존 id와 가져온id 비교
  const index = memos.findIndex( (mm) => mm.id == memo.id )

  // 가져온 memo값을 기존 memo에 다시 넣어준다
  memos[index] = memo;

  res.send('ok'); // 덮어씌움 완료
})


module.exports = router;
