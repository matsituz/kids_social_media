const isTest = process.env.VUE_APP_MODAL_LOGIN || false;

export const mediaLink = isTest
  ? "https://test.lab.marsit.uz/media/"
  : "https://lab.marsit.uz/media/";
