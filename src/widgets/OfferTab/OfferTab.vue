<template>
  <h1 v-if="!checked" class="auth-form__heading">{{ $t("login.heading.offerta") }}</h1>
  <offer-verification v-if="!verified && !checked" @verified="handleVerified" />
  <offerta-student
    v-else-if="verified && !checked"
    @offer-checked="checked = true"
    :offerta_id="offerta?.id"
    :name="name"
    :phone="phone"
  />
  <div class="el-tab__content offerta-checked" v-else-if="verified && checked">
    <h1>{{ $t('login.offerta-checked') }}</h1>
    <img src="@/assets/success.svg" alt="" />
  </div>
</template>
<script>
import OfferVerification from "@/entities/OfferVerification/OfferVerification.vue";
import OffertaStudent from "@/entities/OffertaStudent/OffertaStudent.vue";
import { onBeforeMount, ref } from "vue";
import "./style/offer-tab.css";
import { getOfferta } from "./api/get-offerta";

export default {
  components: {
    OfferVerification,
    OffertaStudent,
  },
  setup(_, { emit }) {
    const verified = ref(false);
    const checked = ref(false);
    const offerta = ref(null);
    const name = ref("");
    const phone = ref("");

    const handleVerified = (newName, newPhone) => {
      verified.value = true;
      name.value = newName;
      phone.value = newPhone;
    };

    const getTerms = async () => {
      offerta.value = await getOfferta().then((res) => res.data);
      emit('term', offerta.value)
    };

    onBeforeMount(async () => {
      await getTerms();
    });

    return {
      verified,
      checked,
      handleVerified,
      offerta,
      name,
      phone,
    };
  },
};
</script>