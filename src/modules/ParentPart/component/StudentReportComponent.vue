<template>
  <div class="student-report">
    <!-- <el-dialog
      v-model="reportDialogVal"
      align-center
      style="
        border-radius: 25px;
        width: 390px;
        padding: 20px;
        text-align: center;
      "
    >
      <div v-if="studentReportLink.length">
        <h2 style="margin: 0; padding: 0">
          {{ $t("parent-part.learning-journey.scan") }}
        </h2>
        <p style="padding: 0; margin: 10px 0">
          {{ $t("parent-part.learning-journey.report-text") }}
        </p>
        <QrCodeVue :value="studentReportLink" :size="150" level="M" />
      </div>
      <div v-else>
        <p>{{ $t("parent-part.learning-journey.report-message") }}</p>
      </div>
    </el-dialog> -->
    <button class="student-report-btn" @click="getReport">
      {{ $t("parent-part.learning-journey.report-btn-text") }}
    </button>
  </div>
</template>

<script>
import { getStudentReport } from "@/service/get-student-report.service";
import { ElMessage } from "element-plus";
import html2pdf from "html2pdf.js";
// import QrCodeVue from "qrcode.vue";
import { ref } from "vue";
export default {
  // props: ["studentInfo", "isOpenReport"],
  components: {
    // QrCodeVue,
  },
  setup() {
    const lang = ref(localStorage.getItem("lang"));
    const getReport = async () => {
      lang.value = localStorage.getItem("lang");
      await getStudentReport(lang.value)
        .then((res) => {
          const options = {
            margin: 0,
            padding:0,
            filename: "student-report.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          };

          html2pdf()
            .from(res.data)
            .set(options)
            .toPdf()
            .output("datauristring")
            .then(function (pdfDataUri) {
              const link = document.createElement("a");
              link.href = pdfDataUri;
              link.download = options.filename;

              document.body.appendChild(link);
              link.click();

              document.body.removeChild(link);
            });
        })
        .catch(() => {
          ElMessage({
            message: "Student report not found!",
            type: "warning",
            duration: 2000,
          });
        });
    };

    return {
      getReport,
    };
  },
};
</script>
<style></style>
