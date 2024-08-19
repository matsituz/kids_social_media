<template>
  <div class="change-phone">
    <div class="change-phone__heading">
      <h1>{{ $t("header.modal.change-phone") }}</h1>
      <button @click="close">
        <img src="@/assets/times-icon.png" alt="close" />
      </button>
    </div>
    <div class="change-phone__body-wrapper" v-if="own_phone.length">
      <div class="change-phone__body">
        <template v-for="(phone, index) in own_phone" :key="index">
          <div class="change-phone__body-input">
            <label
              >{{ $t("header.modal.phone-number") }} {{ index + 1 }}:</label
            >
            <input type="text" v-model="own_phone[index].phone" />
          </div>
        </template>
      </div>
      <div class="new-phone">
        <div class="new-phone_btn" @click="openNew = !openNew">
          <p>{{ $t("header.modal.new-number") }}</p>
          <span>+</span>
        </div>
        <div class="new-phone_body" v-if="openNew">
          <div class="change-phone__body-input">
            <label>{{ $t("header.modal.phone-number") }}:</label>
            <input type="text" v-model="newPhone" />
          </div>
        </div>
      </div>
    </div>
    <div class="change-phone__body-wrapper" v-else>
      <div class="new-phone">
        <div class="new-phone_body">
          <div class="change-phone__body-input">
            <label>{{ $t("header.modal.phone-number") }}:</label>
            <input type="text" v-model="newPhone" />
          </div>
        </div>
      </div>
    </div>

    <div class="change-phone__footer">
      <button @click="updatePhones">
        {{ $t("header.modal.confirm_btn") }}
      </button>
    </div>
  </div>
</template>
  
<script>
import "./style/style.css";
import { changePhone } from "./api/patch-phone";
import { postPhone } from "./api/post-phone";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup(_, { emit }) {
    const store = useStore();
    const studentInfo = store.state.student.studentInfo;
    const openNew = ref(false);
    const newPhone = ref("");

    const { t } = useI18n();

    const own_phone = ref(studentInfo?.data?.phones.own);
    const originalPhones = studentInfo?.data?.phones?.own?.map(
      (phone) => phone.phone
    );

    watch(() => store.state.student.studentInfo, (newValue) => {
      studentInfo.value = newValue;
    });

    const updatePhones = async () => {
      try {
        if (own_phone.value) {
          for (let i = 0; i < own_phone.value.length; i++) {
            const phone = own_phone.value[i];
            const originalPhone = originalPhones[i];
            if (phone.phone !== originalPhone) {
              const phoneRegex = /^\+998\d{9}$/;
              if (phoneRegex.test(phone.phone)) {
                const data = {
                  old_phone_number: originalPhone,
                  new_phone_number: phone.phone,
                };
                await changePhone(data);
              } else {
                // setTimeout(() => location.reload(), 2000);
                throw new Error(t("header.modal.invalid-number"));
              }
            }
          }
        }
        if (newPhone.value) {
          const phoneRegex = /^\+998\d{9}$/;
          if (phoneRegex.test(newPhone.value)) {
            const data = {
              phone_number: newPhone.value,
            };
            await postPhone(data);
          } else {
            throw new Error(t("header.modal.invalid-number"));
          }
        }
        ElMessage({
          message: t("header.modal.change-phone-success"),
          type: "success",
          duration: 2000,
        });
        close();
        setTimeout(() => location.reload(), 2000);
      } catch (error) {
        console.error("Error updating phones:", error);
        ElMessage({
          message: error.message || t("header.modal.change-phone-failed"),
          type: "error",
          duration: 2000,
        });
      }
    };

    const close = () => {
      emit("close");
    };

    return {
      close,
      studentInfo,
      own_phone,
      updatePhones,
      openNew,
      newPhone,
    };
  },
};
</script>