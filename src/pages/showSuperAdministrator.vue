<template>
    <div class="show-outbox">
        <div class="administrator">
            <div class="table-container1" v-if="currentPage === 'administrator'">
                <el-table :data="userData" height="800" border style="width: 100%"
                    :default-sort="{ prop: 'ranking', order: 'ascending' }">
                    <el-table-column prop="ranking" label="排名" width="180" sortable :sort-method="customSort">
                    </el-table-column>
                    <el-table-column prop="user" label="用户" width="210">
                        <template slot-scope="scope">
                            <div>
                                <span>{{ scope.row.name }}</span>
                                <span class="user-classes">{{ scope.row.classes }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="average" label="考核平均分数">
                    </el-table-column>
                </el-table>
                <div class="toSuperAdministrator-button">
                    <el-button type="primary" @click="toSuperAdministrator">管理员信息<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </div>
            </div>
            <div class="table-container2" v-else-if="currentPage === 'superAdministrator'">
                <input v-model="email" placeholder="请输入邮箱" />
                <el-button type="success" class="button1" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
                <div class="superAdministrattor">
                    <template>
                        <el-table :data="administratorData" height="700" border style="width: 700px">
                            <el-table-column prop="name" label="姓名" width="180">
                            </el-table-column>
                            <el-table-column prop="studentId" label="学号" width="180">
                            </el-table-column>
                            <el-table-column prop="email" label="邮箱">
                            </el-table-column>
                            <el-table-column label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            currentPage: "administrator",
            email: '',
            userData: [
                { ranking: 1, name: '诸雨轩', classes: '软件2302', average: 100 },
                { ranking: 2, name: '方雅雯', classes: '会计2303', average: 99 },
                { ranking: 3, name: '张思琦', classes: '国贸2302', average: 97 },
                { ranking: 5, name: '张思琦', classes: '国贸2302', average: 95 },
                { ranking: 6, name: '张思琦', classes: '国贸2302', average: 94 },
                { ranking: 9, name: '张思琦', classes: '国贸2302', average: 91 },
                { ranking: 7, name: '张思琦', classes: '国贸2302', average: 93 },
                { ranking: 11, name: '张思琦', classes: '国贸2302', average: 89 },
                { ranking: 10, name: '张思琦', classes: '国贸2302', average: 90 },
                { ranking: 4, name: '张思琦', classes: '国贸2302', average: 96 },
                { ranking: 12, name: '莫兰慧', classes: '软件2301', average: 88 },
                { ranking: 13, name: '张小玉', classes: '软件2301', average: 87 },
                { ranking: 14, name: '颜富裕', classes: '软件2301', average: 86 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
                { ranking: 8, name: '方雅雯', classes: '会计2303', average: 92 },
            ],
            administratorData: [
                { name: '诸雨轩', studentId: '6020231859', email: '3253857376@qq.com' },
                { name: '张小玉', studentId: '6020231858', email: '3253857375@qq.com' },
                { name: '颜富裕', studentId: '6020231857', email: '3253857374@qq.com' },
                { name: '莫兰慧', studentId: '6020231856', email: '3253857373@qq.com' },
                { name: '张思琦', studentId: '6020231855', email: '3253857372@qq.com' },
                { name: '方雅雯', studentId: '6020231854', email: '3253857371@qq.com' },
                { name: '诸雨轩', studentId: '6020231859', email: '3253857376@qq.com' },
                { name: '张小玉', studentId: '6020231858', email: '3253857375@qq.com' },
                { name: '颜富裕', studentId: '6020231857', email: '3253857374@qq.com' },
                { name: '莫兰慧', studentId: '6020231856', email: '3253857373@qq.com' },
                { name: '张思琦', studentId: '6020231855', email: '3253857372@qq.com' },
                { name: '方雅雯', studentId: '6020231854', email: '3253857371@qq.com' },
            ]
        };
    },
    mounted() {
        this.fetchAdministrators();
        this.fetchUsers();
    },
    methods: {
        toSuperAdministrator() {
            this.currentPage = 'superAdministrator';
        },
        fetchUsers() {
            axios.post("http://localhost:8080/qingteng-recruitment/root/select_user",
                {},
                {
                    headers: {
                        "token": `${this.$store.state.token}`,
                    },
                }
            )
                .then((response) => {
                    this.userData = response.data.data;
                })
                .catch((error) => {
                    this.error = error.message;
                    console.error("Error fetching users:", error);
                });
        },
        fetchAdministrators() {
            axios.post("http://localhost:8080/qingteng-recruitment/root/select_administrator",
                {},
                {
                    headers: {
                        "token": `${this.$store.state.token}`,
                    },
                }
            )
                .then((response) => {
                    this.administratorData = response.data.data;
                })
                .catch((error) => {
                    this.error = error.message;
                    console.error("Error fetching users:", error);
                });
        },
        handleAdd() {
            const newAdministrator = {
                name: 'this.name',
                studentId: 'this.studentId',
                email: 'this.email'
            };
            axios.post('http://localhost:8080//qingteng-recruitment/root/add_administrator', newAdministrator)
                .then(response => {
                    this.administratorData.push(response.data.data);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '添加失败: ' + error.message
                    });
                });
        },
        handleDelete(index, row) {
            this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post(`http://localhost:8080/qingteng-recruitment/root/delete_administrator`,{studentId:row.studentId})
                    .then(() => {
                        this.administratorData.splice(index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(error => {
                        this.$message({
                            type: 'error',
                            message: '删除失败: ' + error.message
                        });
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style>
.show-outbox {
    width: 100%;
    height: 100%;
    display: flex;
    background: url(../../src/assets/itr-png/27.jpg);
    background-size: 100% 100%;
}

.table-container1 {
    display: flex;
    width: 800px;
    height: 880px;
    margin-left: 280px;
    margin-top: 40px;
}

.user-classes {
    margin-left: 40px;
}

.administrator {
    flex-direction: column;
    align-items: stretch;
}

.toSuperAdministrator-button {
    width: 150px;
    height: 60px;
    margin-top: 810px;
    margin-left: -800px;
}

.table-container2 {
    display: flex;
    width: 800px;
    height: 880px;
    margin-left: 280px;
    margin-top: 40px;
}

.button1 {
    width: 100px;
    height: 40px;
    margin-left: 50px;
}

.superAdministrattor {
    margin-top: 100px;
    margin-left: -400px;
}
</style>