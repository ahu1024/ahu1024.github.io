var allUserString = new Array(100)
    .fill("1")
    .map((n, i) => Mock.Random.cname())
    .join("/");

var app = new Vue({
    el: "#app",
    data: {
        title: localStorage.getItem('title') || "圣诞节快乐",
        allUserString: localStorage.getItem('allUserString') || allUserString, // 所有名字字符串
        size: +localStorage.getItem('size') || 10, // 一次抽几个
        isWait: true,
        loading: false,
        show_result: false,
        show_setting: false,
        allUser: [], // 抽奖池
        round: 1, // 抽几次
        result: [
            // {
            //     round: "",
            //     user: [],
            // },
        ]
    },
    created() {
        this.allUser = this.allUserString.split("/").filter((i) => i !== "");
        console.log(this.allUser);
        window.addEventListener("keyup", e => {
            if (e.code === "Space") this.start()
        })
    },
    computed: {
        less() {
            var allSum = this.allUserString.split("/").length;
            if (this.result.length === 0) return allSum;
            var nowSum = this.result.map(i => i.user.length).reduce((sum, i) => sum + i);
            return allSum - nowSum;
        },
        rollupStyle() {
            return {
                height: 30 * (this.size > 10 ? 10 : this.size) + "px"
            };
        }
    },
    watch: {
        title: function (val) {
            localStorage.setItem("title", val)
        },
        size: function (val) {
            localStorage.setItem("size", val)
        },
        allUserString: function (val) {
            localStorage.setItem("allUserString", val)
            this.allUser = val.split("/").filter((i) => !!i);
        }
    },
    methods: {
        fmtName(name) {
            return name[0] + "*" + name[name.length - 1];
        },
        start() {
            if (this.less < this.size) return alert("数据太少啦～");
            this.isWait = false;
            if (this.loading) {
                clearInterval(this.timer);
                this.result.push({
                    round: this.round,
                    user: this.allUser.slice(0, this.size)
                });
                this.round++;
                this.loading = false;
                if (this.allUser.length === 0) alert("抽奖结束啦～");
                return;
            }

            var last_round = this.result[this.result.length - 1];
            if (last_round) this.allUser.splice(0, last_round.user.length);

            this.loading = true;
            this.timer = setInterval(() => {
                this.allUser = _.shuffle(this.allUser);
            }, 100);
        }
    }
});