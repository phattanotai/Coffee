<template>
  <div>
    <Navbar navbar-page="Dashbord" />
    <div id="dashbord" class="container-fluid py-4">
      <SummaryComponent />
      <div class="row pb-4"></div>
    </div>
  </div>
</template>

<script>
import SummaryComponent from "./SummaryUser/SummaryUser";
import Navbar from "@/layout/Navbar";
export default {
  name: "Dashbord",
  components: {
    SummaryComponent,
    Navbar,
  },
  data: () => ({}),
};
</script>
