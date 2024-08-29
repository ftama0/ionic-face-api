<template>
    <ion-page id="home-content" v-bind="$attrs">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Account Detail</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Username</p>
                        <p class="detail__sub">{{ vdata.username }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Full name</p>
                        <p class="detail__sub">{{ vdata.fullname }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Email</p>
                        <p class="detail__sub">{{ vdata.email }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Role</p>
                        <p class="detail__sub">
                            {{ vdata.role_name }}
                        </p>

                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Create At</p>
                        <p class="detail__sub">{{ userAccount.formattedCreatedAt }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Update At</p>
                        <p class="detail__sub">{{ userAccount.formattedUpdateAt }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Last Login</p>
                        <p class="detail__sub">{{ userAccount.formattedLastLogin }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <p class="detail__header">Status</p>
                    </ion-label>
                    <ChipComponent :color="vdata.status == true ? 'success' : 'danger'">
                        {{ vdata.status == true ? 'Active' : 'Non Active' }}
                    </ChipComponent>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue';
import { userAccountStore } from '@/store/userAccountStore';
import { useRouter } from 'vue-router';
import ChipComponent from '@/components/ChipComponent.vue';

// data
const { proxy } = getCurrentInstance()
const userAccount = userAccountStore();
const router = useRouter();
// api 
const logout = () => {

    router.replace({ name: 'Login' });
};
// computed 
const vdata = computed(() => userAccount.userDetails.data);
// Another Method 
onMounted(async () => {
    console.log(vdata.value)

});
</script>