<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
        <i class="fa fa-search fa-lg"></i>
        <input type="text" placeholder="Digite para filtrar..." 
           v-model="treeFilter" class="filter-field">
    </div>
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree" />
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
export default {
    name: 'Menu',
    components: {
        Tree
    },
    computed: {
        ...mapState(['isMenuVisible'])
    },
    data() {
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text' : 'name' },
                filter: {
                    emptyText: 'Categoria nao encontrada'
                }
            }
        }
    },
    methods: {
        getTreeData() {
            let items= [
                {name: 'Inicio'},
                {name: 'Configuracoes', children: [
                    {name: 'Administracao'}
                ]}
            ];
            return items
        },
        onNodeSelect(node) {
            let nav = node.data.text
            console.log(nav)
            if(nav === 'Inicio'){
                this.$router.push ({
                    name: 'home'
                })
                .catch(() =>{})
            } else if (nav === 'Administracao'){
                this.$router.push ({
                    name: 'adminPages'
                })
                .catch(()=>{})
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu span,
    .menu span:hover {
        color: #fff;
        text-decoration: none;
    }

    .menu .tree-node.selected.draggable > .tree-content,
    .menu .tree-node.draggable .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(3);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }

    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }

    .menu input {
        color: #CCC;
        font-size: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty{
        color: #CCC;
        font-size: 1.3rem;
        margin-left: 20px;
    }
</style>