<template>
  <div>
    <Navbar navbar-page="งานที่เหลือ" />
    <div id="note" class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div class="card-body card--scroll">
              <li>เวลาหน้าตั้งค่าเกม</li>
              <li>หน้าเพิ่มโปร กล่องรายละเอียด</li>
              <hr />
              <p>Sort management</p>
              <ul>
                <li>เรียงลำดับไม่สำเร็จ</li>
              </ul>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/layout/Navbar";
export default {
  name: "note",
  components: {
    Navbar,
  },
  data: () => ({}),
  methods: {},
};
</script>
