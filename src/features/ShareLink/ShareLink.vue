<template>
  <div class="share-link-dialog">
    <div class="share-link-dialog__header">
      <h1>{{ $t("main.share-link.modal.share") }}</h1>
      <button @click="close">
        <img src="@/assets/close-icon.png" alt="" />
      </button>
    </div>
    <div class="share-link-dialog__body">
      <div class="share-link-dialog__body-link">
        <p
          :class="['link', { generated: generated }]"
          @click.right.prevent
          @keydown="keydown"
          @copy.prevent
          @paste.prevent
        >
          {{ generated ? refferalLink : $t("Generated link will appear here") }}
        </p>
      </div>
      <button
        v-if="!generated"
        @click="generateRefferalLink"
        class="share-link-dialog__body-btn"
      >
        {{ $t("main.share-link.modal.generate") }}
      </button>
      <button
        v-else
        :disabled="!!remainingTime"
        :class="['share-link-dialog__body-btn', { timer: remainingTime }]"
        @click="shareRefferalLink"
      >
        {{ remainingTime || $t("main.share-link.modal.copy-link") }}
      </button>
      <p v-if="copied" class="copied">
        {{ $t("main.share-link.modal.copied") }}
      </p>
      <p v-if="generated" class="warning">
        <span>*</span> {{ $t("main.share-link.modal.warning") }}
      </p>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { generateLink } from "./api/generate-link";
import { shareLink } from "./api/share-link";
import { getMe } from "./api/get-me";
import "./style/share.css";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";

export default {
  setup(_, { emit }) {
    const generated = ref(false);
    const refferalLink = ref(null);
    const remainingTime = ref(null);
    // const intervalId = ref(null);
    const copied = ref(false);

    const { t } = useI18n();

    const generateRefferalLink = async () => {
      try {
        await generateLink();
        generated.value = true;
        await getStudentInfo();
      } catch (error) {
        if (
          error.response.status === 400 &&
          error.response.data.detail === "Already created"
        ) {
          ElMessage({
            message: t("main.share-link.modal.already-created"),
            type: "error",
            duration: 2000,
          });
        }
      }
    };

    // const formatTime = (milliseconds) => {
    //   const totalSeconds = Math.floor(milliseconds / 1000);
    //   const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    //   const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    //     2,
    //     "0"
    //   );
    //   const seconds = String(totalSeconds % 60).padStart(2, "0");
    //   return `${hours}:${minutes}:${seconds}`;
    // };

    // const startTimer = (endTime) => {
    //   const calculateRemainingTime = () => {
    //     const now = Date.now();
    //     const remaining = endTime - now;

    //     if (remaining <= 0) {
    //       clearInterval(intervalId.value);
    //       remainingTime.value = null;
    //       return;
    //     }
    //     remainingTime.value = formatTime(remaining);
    //   };
    //   calculateRemainingTime();
    //   intervalId.value = setInterval(calculateRemainingTime, 1000);
    // };

    const shareRefferalLink = async () => {
      try {
        await navigator.clipboard.writeText(refferalLink.value);
        ElMessage({
          message: t("main.share-link.modal.copied"),
          type: "success",
          duration: 2000,
        });

        await shareLink();
        // const endTime = Date.now() + 8 * 60 * 60 * 1000;
        // localStorage.setItem('referralTimerEndTime', endTime);
        // startTimer(endTime);
      } catch (error) {
        if (error.response.status === 400) {
          console.log("Failed to share link");
        } else {
          console.error(
            "Failed to copy the referral link to the clipboard:",
            error
          );
        }
      }
    };

    const close = () => {
      emit("close");
    };

    const getStudentInfo = async () => {
      const response = await getMe();
      const referralCode = response.data.referral_link;
      if (referralCode) {
        const referralCodeRegex = /referral_code=([\w\d-]+)/;
        const match = referralCodeRegex.exec(referralCode);
        const extractedReferralCode = match ? match[1] : null;
        if (extractedReferralCode) {
          if (referralCode.includes("test.api")) {
            refferalLink.value = `https://test.space.marsit.uz/signup?referral_code=${extractedReferralCode}`;
          } else {
            refferalLink.value = `https://space.marsit.uz/signup?referral_code=${extractedReferralCode}`;
          }
        }
      }
    };

    onMounted(async () => {
      await getStudentInfo();
      if (refferalLink.value) {
        generated.value = true;
      }
      // const storedEndTime = localStorage.getItem('referralTimerEndTime');
      // if (storedEndTime) {
      //   const endTime = parseInt(storedEndTime, 10);
      //   if (Date.now() < endTime) {
      //     startTimer(endTime);
      //   } else {
      //     localStorage.removeItem('referralTimerEndTime');
      //   }
      // }
    });

    // onUnmounted(() => {
    //   if (intervalId.value) {
    //     clearInterval(intervalId.value);
    //   }
    // });

    return {
      close,
      generated,
      refferalLink,
      remainingTime,
      generateRefferalLink,
      shareRefferalLink,
      copied,
    };
  },
};
</script>

