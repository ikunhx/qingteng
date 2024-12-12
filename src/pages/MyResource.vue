
<template>
  <div>
    <h2>管理端资源功能</h2>
    <el-popover
      placement="top-start"
      width="100"
      trigger="hover"
      content="发布资源"
    >
      <i
        class="el-icon-circle-plus-outline"
        slot="reference"
        @click="publishResource"
      ></i>
    </el-popover>
    <el-card class="box-card" style="width: 1100px">
      <el-table :data="resources" style="width: 100%">
        <el-table-column prop="id" label="资源ID"></el-table-column>
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column label="操作" style="padding-left: 20px">
          <template slot-scope="scope">
            <el-button
              @click="openResource(scope.row.id)"
              style="color: green; cursor: pointer"
              >打开</el-button
            >
            <el-button
              @click="editResources(scope.row)"
              style="color: blue; cursor: pointer"
              >编辑</el-button
            >
            <el-button
              @click="deleteResource(scope.row.id)"
              style="color: red; cursor: pointer"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="编辑资源" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="资源名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源文件">
          <el-upload
            class="upload-demo"
            drag
            multiple
            action="http://localhost:8080/qingteng-recruitment/user/common/upload"
            :on-change="handleFileChange"
            ref="upload"
            accept=".zip"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :http-request="customUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到这里，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只支持zip格式文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="发布资源" :visible.sync="newDialogVisible">
      <el-form :model="newForm">
        <el-form-item label="资源名">
          <el-input v-model="newForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源文件">
          <el-upload
            class="upload-demo"
            drag
            multiple
            action="http://localhost:8080/qingteng-recruitment/user/common/upload"
            :on-change="handleFileChange"
            ref="upload"
            :before-upload="beforeAvatarUpload"
            accept=".zip"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :http-request="newCustomUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到这里，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只支持zip格式文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer
      :with-header="false"
      :visible.sync="answerTable"
      direction="ltr"
      size="80%"
    >
      <!-- 加载动画 -->
      <div
        v-if="!pdfFiles.length && !videoFiles.length"
        class="loading-container"
      >
        <div class="spinner"></div>
      </div>
      <video
        v-for="(videoFile, index) in videoFiles"
        :key="index"
        :src="videoFile.url"
        fit="fill"
        controls
        style="width: 100%"
      ></video>
      <div
        v-for="(pdfFile, index) in pdfFiles"
        :key="index"
        class="pdf-container"
      >
        <embed
          :src="pdfFile.url"
          type="application/pdf"
          width="100%"
          height="80vh"
          class="pdf"
        />
      </div>
    </el-drawer>
  </div>
</template>
<script>
import axios from "axios";
import JSZip from "jszip";
export default {
  data() {
    return {
      resources: [
        { name: "Java", id: "01", fileUrl: "path/to/java/file.pdf" },
        { name: "C++", id: "02", fileUrl: "path/to/cpp/file.zip" },
        { name: "Vue", id: "03", fileUrl: "path/to/vue/file.zip" },
        { name: "Html", id: "04", fileUrl: "path/to/html/file.zip" },
      ],
      newDialogVisible: false,
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        file: null,
      },
      newForm: {
        name: "",
      },
      fileList: [],
      answerTable: false,
      fileUrl: "https://raw.githubusercontent.com/ikunhx/test/master/video.zip",
      pdfFiles: [],
      videoFiles: [],
      fullscreenLoading: false,
    };
  },
  methods: {
    // 展示资源
    async fetchResources() {
      try {
        const response = await axios.post(
          "http://localhost:8080/qingteng-recruitment/root/display_resource",
          {},
          {
            headers: {
              token: `${this.$store.state.token}`,
            },
          }
        );
        alert(response.data.data);
        this.resources = response.data.data; // 获取资源数据
      } catch (error) {
        console.log("获取资源失败", error);
      }
    },
    beforeAvatarUpload(file) {
    const isZIP = file.type === 'application/zip';
    const isLt400M = file.size / 1024 / 1024 < 400;

    if (!isZIP) {
      this.$message.error('只能上传zip文件!');
    }
    if (!isLt400M) {
      this.$message.error('文件大小不能超过 400MB!');
    }

    return isZIP && isLt400M;
  },
    // 打开资源
    openResource(id) {
      this.answerTable = true;
      this.fetchAndUnzip(this.fileUrl);
      const resource = this.resources.find((item) => item.id === id);
      if (resource && resource.fileUrl) {
        // 根据文件类型决定如何打开文件
        const fileType = resource.fileUrl.split(".").pop().toLowerCase();
        switch (fileType) {
          case "pdf":
            // window.open(resource.fileUrl, '_blank');
            break;
          case "zip":
            this.answerTable = true;
            this.fetchAndUnzip(resource.fileUrl);
            break;
          default:
            console.error("不支持的文件类型");
        }
      } else {
        console.error("文件未找到或没有可用的文件链接");
      }
    },
    // 预览资源
    async fetchAndUnzip(zipUrl) {
      try {
        console.log(zipUrl);
        // 使用 axios 下载文件
        const response = await axios({
          url: zipUrl,
          method: "GET",
          responseType: "arraybuffer", // 获取二进制数据
        });
        if (response.status !== 200) {
          throw new Error(`请求失败，状态码: ${response.status}`);
        }
        // 使用 JSZip 解压压缩包
        const zip = new JSZip();
        const content = await zip.loadAsync(response.data);
        // 清空现有的文件列表
        this.pdfFiles = [];
        this.videoFiles = [];
        // 遍历压缩包中的文件
        content.forEach((relativePath, file) => {
          if (file.dir) return; // 忽略目录
          // 将文件转换为 Blob 对象，并指定 MIME 类型
          file.async("blob").then(async (blob) => {
            const fileUrl = URL.createObjectURL(blob);
            console.log(`Generated URL for ${file.name}: ${fileUrl}`); // 打印生成的 URL
            const fileType = file.name.split(".").pop().toLowerCase();
            let mimeType;
            if (fileType === "pdf") {
              mimeType = "application/pdf";
            } else if (["mp4", "avi", "mov", "mkv"].includes(fileType)) {
              mimeType = "video/" + fileType;
            } else {
              mimeType = "application/octet-stream"; // 默认 MIME 类型
            }
            const typedBlob = new Blob([blob], { type: mimeType });
            const typedFileUrl = URL.createObjectURL(typedBlob);
            if (fileType === "pdf") {
              this.pdfFiles.push({ name: file.name, url: typedFileUrl });
            } else if (["mp4", "avi", "mov", "mkv"].includes(fileType)) {
              this.videoFiles.push({ name: file.name, url: typedFileUrl });
            }
          });
        });
      } catch (error) {
        console.error("解压失败:", error.message);
      }
    },
    colorId(id) {
      return id % 4;
    },
    // 编辑资源
    editResources(row) {
      this.dialogVisible = true;
      this.form.id = row.id;
    },
    customUpload(options) {
      const formData = new FormData();
      formData.append("file", options.file);

      axios
        .post(options.action, formData, {
          headers: {
            token: `${this.$store.state.token}`,
          },
        })
        .then((response) => {
          // 成功处理
          this.handleSuccessEdit(response.data.data);
        })
        .catch((error) => {
          // 错误处理
          options.onError && options.onError(error);
        });
    },

    handleSuccessEdit(fileUrl) {
      // 提交表单
      this.submitFormEdit(fileUrl);
    },
    submitFormEdit(fileUrl) {
      // 这里应该是你的表单提交逻辑
      this.fullscreenLoading = true;
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("id", this.form.id);
      formData.append("fileUrl", fileUrl);

      const url =
        "http://localhost:8080/qingteng-recruitment/root/resource_edit";
      axios
        .post(url, formData, {
          headers: {
            token: `${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.closeEdit();
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("考核添加失败：" + error.message);
        });
    },
    newCustomUpload(options) {
      const formData = new FormData();
      formData.append("file", options.file);

      axios
        .post(options.action, formData, {
          headers: {
            token: `${this.$store.state.token}`,
          },
        })
        .then((response) => {
          // 成功处理
          this.handleSuccessAdd(response.data.data);
        })
        .catch((error) => {
          // 错误处理
          options.onError && options.onError(error);
        });
    },
    handleSuccessAdd(fileUrl) {
      // 提交表单
      this.submitFormAdd(fileUrl);
    },
    submitFormAdd(fileUrl) {
      // 这里应该是你的表单提交逻辑
      this.fullscreenLoading = true;
      const formData = new FormData();
      formData.append("name", this.newForm.name);
      formData.append("fileUrl", fileUrl);
      const url =
        "http://localhost:8080/qingteng-recruitment/root/resource_edit";
      axios
        .post(url, formData, {
          headers: {
            token: `${this.$store.state.token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.closeEdit();
        })
        .catch((error) => {
          this.fullscreenLoading = false;
          this.$message.error("资源添加失败：" + error.message);
        });
    },

    // 文件拖拽
    handleFileChange(file) {
      this.fileList.push(file.file);
      this.form.file = file.file.raw; // 确保文件格式正确
    },
    submitUpload() {
      this.$refs.upload.submit();
      console.log(this.newForm.name);
    },

    publishResource() {
      this.newDialogVisible = true;
    },

    // 删除资源
    async deleteResource(id) {
      try {
        const response = await axios.post(
          "https://qingteng-recruitment/root/resource_delete",
          {
            id: id,
          },
          {
            headers: {
              token: `${this.$store.state.token}`,
            },
          }
        );
        if (response.data.code === 200) {
          console.log("资源删除成功");
          this.fetchResources(); // 刷新资源列表
        }
      } catch (error) {
        console.error("删除资源失败", error);
      }
    },
  },
  mounted() {
    this.fetchResources(); // 页面加载时获取资源
  },
};
</script>

<style scoped>
.upload-demo .el-upload__text {
  font-size: 14px;
}
.pdf {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
.pdf-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
}
/* 加载动画样式 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.el-icon-circle-plus-outline {
  font-size: 40px;
  font-weight: 0;
  margin-top: -50px;
  margin-right: 10px;
  float: right;
  transition: 0.4s;

  color: #90ee90;
  cursor: pointer;
}
.el-icon-circle-plus-outline:hover {
  color: #2ba257;
  transform: scale(1.1);
}
</style>
