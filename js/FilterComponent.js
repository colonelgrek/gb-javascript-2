Vue.component('filter-comp', {

    template: `<form action="#" class="search-form" @submit.prevent="$parent.filter(userSearch)">
                <input type="text" class="search-field" v-model="$parent.userSearch">
                <button type="submit" class="btn-search">search</button>
            </form>`
})