new ClipboardJS('.btn');
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})
const initTable = "ranged"
const diceCodes = {
    "setback": "s",
    "difficulty": "p",
    "challenge": "r",
}
var app1 = new Vue({
    el: '#craft-app',
    data: {
        price: 0.0,
        difficulty: "",
        table: initTable,
        rows: tables[initTable],
        tableNames: Object.keys(tables),
        tables: tables,
        improvements: [],
        totalPrice: 0,
        totalDifficulty: ""
    },
    methods: {
        addImprovement: function (type, effect) {
            this.improvements.push({ type: type, effect: effect })
        },
        removeImprovement: function (index) {
            this.improvements.splice(index, 1)
        }
    },
    beforeUpdate: function () {
        var typeMap = {
            "simple": { difficulty: diceCodes["setback"], costMod: 0.25 },
            "intermediate": { difficulty: diceCodes["setback"] + diceCodes["setback"], costMod: 0.25 },
            "advanced": { difficulty: diceCodes["difficulty"], costMod: 0.25 },
            "masterwork": { difficulty: diceCodes["difficulty"] + diceCodes["setback"], costMod: 1.00 },
        }
        const price = parseFloat(this.price)
        this.difficulty = this.difficulty.toLowerCase()
        var totalDifficulty = this.difficulty
        var totalPrice = price
        this.improvements.forEach(function (improvement) {
            totalDifficulty += typeMap[improvement.type].difficulty
            improvement.diff = typeMap[improvement.type].difficulty
            totalPrice += price * typeMap[improvement.type].costMod
            improvement.cost = price * typeMap[improvement.type].costMod
        })

        var difficultyChars = totalDifficulty.split("")
        for (let index = 0; index < Math.floor(this.improvements.length / 3); index++) {
            const dieIndex = difficultyChars.indexOf(diceCodes["difficulty"]);
            if (dieIndex >= 0) {
                difficultyChars[dieIndex] = diceCodes["challenge"];
            } else {
                difficultyChars.push(diceCodes["difficulty"])
            }
        }

        difficultyChars.sort()

        this.totalDifficulty = difficultyChars.join("")
        this.totalPrice = totalPrice
        this.rows = this.tables[this.table]
    }
})