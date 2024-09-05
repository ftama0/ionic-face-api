<template>
  <MenuComponent :contentId="mainContentId" />
  <ion-page id="userAccount-content" v-bind="$attrs">
    <HeaderComponent :title="'User Account'" />
    <ion-content>
      <ion-card class="ion-card">
        <ion-card-content>
          <ion-item button detail="true" router-link="/userAccount">
            <ion-icon class="custom__icon1" :icon="icons.peopleOutline" slot="start"></ion-icon>
            <ion-label class="label__header">User Account</ion-label>
          </ion-item>

          <ion-item button detail="true" @click="$router.push({ name: 'UserReleaseCode', params: { type: 'RH' } })">
            <ion-icon class="custom__icon1" :icon="icons.idCardOutline" slot="start"></ion-icon>
            <ion-label class="label__header">User Release Code PR</ion-label>
          </ion-item>

          <ion-item button detail="true" @click="$router.push({ name: 'UserReleaseCode', params: { type: 'OH' } })">
            <ion-icon class="custom__icon1" :icon="icons.idCardOutline" slot="start"></ion-icon>
            <ion-label class="label__header">User Release Code PO</ion-label>
          </ion-item>

          <ion-item button detail="true" router-link="/costCenter">
            <ion-icon class="custom__icon1" :icon="icons.idCardOutline" slot="start"></ion-icon>
            <ion-label class="label__header">Maintain Cost Center</ion-label>
          </ion-item>

          <!-- <ion-item button detail="true" router-link="/costCenterPr">
            <ion-icon class="custom__icon1" :icon="icons.idCardOutline" slot="start"></ion-icon>
            <ion-label class="label__header">Maintain Cost Center PR</ion-label>
          </ion-item>

          <ion-item button detail="true" router-link="/costCenterPo">
            <ion-icon class="custom__icon1" :icon="icons.idCardOutline" slot="start"></ion-icon>
            <ion-label class="label__header">Maintain Cost Center PO</ion-label>
          </ion-item> -->

        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-action-sheet :is-open="isOpen" header="Actions" :buttons="actionSheetButtons" @didDismiss="setOpen(false)"
      class="my-custom-class">
    </ion-action-sheet>
    <FooterComponent />
  </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { useRouter } from 'vue-router';
// data
const { proxy } = getCurrentInstance()
const icons = ref(proxy.$icons);
const mainContentId = 'userAccount-content';
/// State to manage Action Sheet
const isOpen = ref(false);
const actionSheetButtons = ref([]);

// api 
// computed 
// mount 
onMounted(async () => {
});

</script>

<style scoped>
.label__header {
  font-weight: 500;
  font-size: 17px;
  line-height: 18px;
  color: #626060;
}
</style>