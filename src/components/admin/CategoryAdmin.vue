<template>
  <div class="category-admin">
      <b-form>
        <input id="category-id" type="hidden" v-model="category.id">
        <b-row>
          <b-col md=12>
            <b-form-group label="Nome:" label-for="category-name">
              <b-form-input 
                id="category-name"
                v-model="category.name"
                :readonly="mode === 'remove'"
                type="text"
                placeholder="Informe o Nome da Categoria..."
                required
              />
            </b-form-group>
          </b-col>
          <b-col md=12>
            <b-form-group label="Categoria Pai:" label-for="category-parent">
              <b-form-select 
                id="category-parent"
                :disabled="mode === 'remove'"
                :options="categoryParents"
                v-model="category.path"
              >
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button variant="secondary" class="ml-2" @click="clear">Cancelar</b-button>
          </b-col>
        </b-row>     
      </b-form>
      <hr>
      <b-table id="table-category" hover striped :items="categories" :fields="fields"
        primary-key="id" :tbody-transition-props="transProps">
        <template #cell(actions)="row">
          <b-button variant="warning" @click="loadCategory(row.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadCategory(row.item, 'remove')" class="mr-2 btn-remove">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
  </div>
</template>

<script>
export default {
    name: 'CategoryAdmin',
    data() {
      return {
        mode: 'save',
        category: {
          path: null
        },
        categories: [
          {id: 1, name: "Web Moderno", path: "Web Moderno"},
          {id: 2, name: "CSS", path: "Web Moderno > CSS"},
          {id: 3, name: "CSS Grid", path: "Web Moderno > CSS > CSS Grid"},
          {id: 4, name: "Flexbox", path: "Web Moderno > CSS > Flexbox"},
        ],
        fields: [
          {key:'id', label: 'Codigo', sortable: true},
          {key:'name', label: 'Nome', sortable: true},
          {key:'path', label: 'Caminho', sortable: true},
          {key:'actions', label: 'Acoes'}
        ],
        transProps: { name: 'flip-list'},
        categoryParents: [
          {value: 'Web Moderno', text: 'Web Moderno'},
          {value: 'Web Moderno > CSS', text: 'Web Moderno > CSS'},
          {value: 'Web Moderno > CSS > CSS Grid', text: 'Web Moderno > CSS > CSS Grid'},
          {value: 'Web Moderno > CSS > Flexbox', text: 'Web Moderno > CSS > Flexbox'},
          {value: 'Web Moderno > JS', text: 'Web Moderno > JS'},
          {value: 'Web Moderno > JS > VueJS', text: 'Web Moderno > JS > VueJS'}
        ]
      }
    },
    methods: {
      clear(){
        this.mode ='save'
        this.category = {
          path: null
        }
      },
      remove(){
        this.clear();
      },
      save(){
        let total = this.categories.length
        let categoryLocal = {...this.category, id: (total + 1)}
        this.categories.push(categoryLocal)
      },
      loadCategory(category, mode = 'save') {
        this.mode = mode
        this.category = {...category }
      }
    }
}
</script>

<style>
    table#table-category .flip-list-move {
        transition: transform 1s;
    }

    @media (max-width: 670px) {
      table#table-category button.btn-remove {
        margin-top: 0.5rem;
      }
    }
</style>