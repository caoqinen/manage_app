<template>
  <div class="about">
    <v-header />
    <v-sidebar class="hidden-sm-and-down" />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags class="hidden-sm-and-down"></v-tags>
      <div class="content">
        <!-- <router-view v-slot="{ Component }">
          <transition
            mode="out-in"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view> -->

        <router-view v-slot="{ Component }">
          <transition
            mode="out-in"
            enter-active-class="animate__animated animate__fadeIn"
          >
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
import vTags from "../components/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  computed: {
    tagsList() {
      return this.$store.state.tagsList.map((item) => item.name);
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
};
</script>
