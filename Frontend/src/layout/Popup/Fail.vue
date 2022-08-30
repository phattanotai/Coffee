<template>
    <div id="complete">
        <svg id="completion" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 101">
            <g id="configurator">
                <g id="configurator_completion">
                    <g id="stars">
                        <circle id="Oval" cx="14" cy="18" r="1" class="st4"></circle>
                        <circle id="Oval-Copy-4" cx="27" cy="20" r="1" class="st4"></circle>
                        <circle id="Oval-Copy-10" cx="76" cy="20" r="1" class="st4"></circle>
                        <circle id="Oval-Copy-2" cx="61.5" cy="12.5" r="1.5" class="st4"></circle>
                        <circle id="Oval-Copy-9" cx="94" cy="53" r="1" class="st4"></circle>
                        <circle id="Oval-Copy-6" cx="88" cy="14" r="1" class="st4"></circle>
                        <circle id="Oval-Copy-7" cx="59" cy="1" r="1" class="st4"></circle>
                        <circle id="Oval_1_" cx="43" cy="9" r="2" class="st4"></circle>
                        <path id="ster-01" d="M28.5 3.8L26 6l2.2-2.5L26 1l2.5 2.2L31 1l-2.2 2.5L31 6z" class="st4">
                        </path>
                        <path id="ster-01"
                            d="M3.5 50.9l-2.1 2.4 1.7-2.7-2.9-1.2 3.1.8.2-3.2.2 3.2 3.1-.8-2.9 1.2 1.7 2.7z"
                            class="st4"></path>
                        <path id="ster-01" d="M93.5 27.8L91 30l2.2-2.5L91 25l2.5 2.2L96 25l-2.2 2.5L96 30z" class="st4">
                        </path>
                        <circle id="Oval-Copy-5" cx="91" cy="40" r="2" class="st4"></circle>
                        <circle id="Oval-Copy-3" cx="7" cy="36" r="2" class="st4"></circle>
                        <circle id="Oval-Copy-8" cx="7.5" cy="5.5" r=".5" class="st4"></circle>
                    </g>
                </g>
            </g>
            <g id="cirkel">
                <g id="Mask">
                    <path id="path-1_1_" d="M49 21c22.1 0 40 17.9 40 40s-17.9 40-40 40S9 83.1 9 61s17.9-40 40-40z"
                        class="st5"></path>
                </g>
            </g>
            <line fill="none" stroke="#FF3465" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="28.4"
                y1="37.9" x2="69.8" y2="82.3" class="path line"></line>
            <line fill="none" stroke="#FF3465" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" x1="69.8"
                y1="37.9" x2="28.4" y2="82.3" class="path line"></line>
        </svg>

        <h5 class="mt-3 font-weight-bold text-black">{{msgText}}</h5>
    </div>
</template>

<script>
    export default {
        name: "complete",
        props: ["msg-text"],

        data: () => ({
            badge: 2
        }),

        methods: {
            logout() {
                storage.clearToken();
            },
        },
    }
</script>

<style>
    #complete .path {
        stroke-dasharray: 1000;
        stroke-dashoffset: 0;
    }

    #complete .path.circle {
        -webkit-animation: dash 0.9s ease-in-out;
        animation: dash 0.9s ease-in-out;
    }

    #complete .path.line {
        stroke-dashoffset: 1000;
        -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
        animation: dash 0.9s 0.35s ease-in-out forwards;
    }

    #complete .path.check {
        stroke-dashoffset: -100;
        -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
        animation: dash-check 0.9s 0.35s ease-in-out forwards;
    }

    @-webkit-keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }

        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 1000;
        }

        100% {
            stroke-dashoffset: 0;
        }
    }

    .st4 {
        fill: #FF3465;
        fill-opacity: 0.4;
    }

    .st5 {
        fill: #FF3465;
        fill-opacity: 0.1;
    }
</style>