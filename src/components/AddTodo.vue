<template>
    <div>
        <h3>Add Your Todo</h3>
        <div class="add">
            <form @submit.prevent="onSubmit">
                <input type="text" v-model="title" placeholder="What you're gonna do?">
                <input type="submit" value="Submit Todo">
            </form>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {
    name: 'AddTodo',
    data() {
        return {
            title: ''
        }
    },
    methods: {
        ...mapActions(['addTodo']),
        onSubmit(event) {
            event.preventDefault()
            this.addTodo(this.title)
            // reset the value aftet submit
            this.title = ''
        }
    }
}
</script>




<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #80cbc4;
  color: rgb(114, 105, 121);
  border: 1px #41b883 solid;
  cursor: pointer;
  outline: none;
  letter-spacing: 1px;
}
input[type="submit"]:hover{
    color: #ffffff;
}
</style>
