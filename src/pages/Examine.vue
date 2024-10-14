<template>
  <div>
    <h1 class="exam-title">管理员考核</h1>
    <el-table :data="exams" :header-cell-style="{ fontSize: '20px' }" :cell-style="{ fontSize: '18px' }">
      <el-table-column prop="name" label="考核"> </el-table-column>
      <el-table-column prop="beginTime" label="开始时间">
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间"> </el-table-column>
      <el-table-column label="操作">
      
          <button
            class="btn-edit btn"
            @click="handleEdit()"
            >编辑</button
          >
          <button
            class="btn-delete btn"
            @click="handleDelete()"
            >删除</button
          >
          <button
            class="btn-ranking btn"
            @click="handleRanking()"
            >排名</button
          >
          <button
            class="btn-score btn"
            @click="handleScore()"
            >评分</button
          >
    
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "Examine",
  data() {
    return {
      exams: [
        {
          id: nanoid(),
          name: "第一次考核",
          beginTime: this.showTime(1728613183630),
          endTime: this.showTime(1728613524152),
        },
        {
          id: nanoid(),
          name: "第二次考核",
          beginTime: this.showTime(1728635736858),
          endTime: this.showTime(1728696238545),
        },
      ],
    };
  },
  methods: {
    showTime(timeString) {
      //传入时间戳，转化为具体时间
      let year = new Date(timeString).getFullYear();
      let month = new Date(timeString).getMonth();
      let day = new Date(timeString).getDate();
      let hour = new Date(timeString).getHours();
      let minute = new Date(timeString).getMinutes();
      let second = new Date(timeString).getSeconds();
      return `${year}-${month + 1}-${day} ${hour}:${minute}:${second}`;
    },
    handleEdit(){},
    handleDelete(){},
    handleRanking(){},
    handleScore(){},
  },
};
</script>

<style scoped>
.exam-title {
  font-size: 34px;
  margin-left: 10px;
  margin-bottom: 20px;
  color: #2ba257;
}

.exam {
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
.btn{
  margin-right: 10px;
  margin-left: 10px;
  margin-top:8px ;
  margin-bottom:8px ;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: 0.25s;
  color: #fff;
}
.btn:hover{
  transform: scale(1.1);
  
}
.btn-edit:hover{
  box-shadow: 0 0 8px rgba(43,162,87,0.8);
  
}
.btn-delete:hover{
  box-shadow: 0 0 8px rgba(255,92,92,0.8);
}
.btn-ranking:hover{
  box-shadow: 0 0 8px rgba( 246,194,62,0.8);
}

.btn-score:hover{
  box-shadow: 0 0 8px rgba(64,152,255,0.8);
}
.btn-edit {
  background-color: #2ba257;
}

.btn-delete {
  background-color: #ff5c5c;
}

.btn-ranking {
  background-color: #f6c23e;
}
.btn-score {
  background-color: #409EFF;
}

</style>