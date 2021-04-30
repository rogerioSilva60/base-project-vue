<template>
  <div class="user-admin">
      <b-form>
        <input id="user-id" type="hidden" v-model="user.id">
        <b-row>
            <b-col md=6 sm=12>
                <b-form-group label="Nome:" label-for="user-name">
                    <b-form-input
                        id="user-name"
                        v-model="user.name"
                        type="text"
                        placeholder="Informe o Nome do Usuario..."
                        required 
                        :state="validName"/>
                    <b-form-invalid-feedback :state="validName">
                        O nome do Usuario e Obrigatorio!
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="validName" />
                </b-form-group>
            </b-col>
            <b-col md=6 sm=12>
                <b-form-group label="E-mail:" label-for="user-email">
                    <b-form-input
                        id="user-email"
                        v-model="user.email"
                        type="text"
                        placeholder="Informe o E-mail do Usuario..."
                        required />
                </b-form-group>
            </b-col>
            <b-col md=6 sm=12>
                <b-form-group label="Senha:" label-for="user-password">
                    <b-form-input
                        id="user-password"
                        v-model="user.password"
                        type="password"
                        placeholder="Informe a Senha do Usuario..."
                        required />
                </b-form-group>
            </b-col>
            <b-col md=6 sm=12>
                <b-form-group label="Confirmacao de Senha:" label-for="user-confirm-password">
                    <b-form-input
                        id="user-confirm-password"
                        v-model="user.confirmPassword"
                        type="password"
                        placeholder="Informe a Senha do Usuario..."
                        required />
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-checkbox id="user.admin" :value="`${true}`" v-model="user.role" class="mt-1 mb-3"> 
                    Administrador?
                </b-form-checkbox>
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
      <b-table id="table-user" hover striped :items="users" :fields="fields" 
        :head-variant="headVariant" primary-key="id" :tbody-transition-props="transProps">
        <template #cell(actions)="row">
            <b-button variant="warning" @click="loadUser(row.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadUser(row.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>
        </template>
      </b-table>
  </div>
</template>

<script>
export default {
    name: 'UserAdmin',
    data() {
        return {
            mode: 'save',
            user: {
                name: ''
            },
            users:[
                {id: 1, name: 'Fernando', email: 'fer@gmail.com', isAdmin: true},
                {id: 2, name: 'Patricia', email: 'pa@gmail.com', isAdmin: true},
                {id: 3, name: 'Joao', email: 'jo@gmail.com', isAdmin: false},
                {id: 4, name: 'Lidia', email: 'li@gmail.com', isAdmin: false}
            ],
            fields:[
                {key:'id', label: 'Codigo', sortable: true},
                {key: 'name', lable: 'Nome', sortable: true},
                {key: 'email', label:'E-mail', sortable: true},
                {key: 'isAdmin', label: 'Administrador?', sortable: true,
                    formatter: value => value ? 'Sim' : 'Nao'
                },
                {key: 'actions', label: 'Acoes'} 
            ],
            transProps: {name: 'flip-list'},
            isValidName: false,
            headVariant: 'light'
        }
    },
    computed: {
        validName() {
            if(!this.user.name && !this.isValidName){
                return null
            } else if (this.user.name) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        clear() {
            this.user = {}
            this.isValidName = false
        },
        remove(){
            console.log(this.user)
            this.clear()
        },
        save(){
            if(!this.user.name){
               this.isValidName = true
            } else {
                let total = this.users.length
                let userLocal = {...this.user, isAdmin: this.user.role, id: (total+1)}
                this.users.push(userLocal)
            }
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    }
}
</script>

<style>
    table#table-user .flip-list-move {
        transition: transform 1s;
    }
</style>