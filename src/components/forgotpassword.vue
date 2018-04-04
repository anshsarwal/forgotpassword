<template>
  <v-container id="parentContainer">
      <v-layout row wrap id="parentLayout">
          <v-flex lg4 offset-lg4 md6 offset-md3 sm6 offset-sm3 xs12 id="parentFlex">
              <v-card flat tile>
                  <v-card-title primary-title>
                      FORGOT PASSWORD
                  </v-card-title>

                  <v-divider></v-divider>
                  <!-- class="input-group--focused" -->
                  <v-form class="form-group" v-model="valid" ref="form" @submit.prevent="send">
                    <v-container text-xs-center>
                        <v-layout row wrap>
                            <v-flex lg9 offset-lg1 md9 offset-md1 sm9 offset-sm1 xs9 offset-xs1>
                                <input 
                                type="password" 
                                name="Password" 
                                v-model="password"
                                placeholder="New Password"        
                                required/>
                                <span v-show="msg2">{{ pwd_msg }}</span>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex lg9 offset-lg1 md9 offset-md1 sm9 offset-sm1 xs9 offset-xs1 class="form-group">
                            <input 
                            type="password" 
                            name="confpassword" 
                            v-model="confpassword"
                            placeholder="Confirm New Password"            
                            required/>
                            <span v-show="msg3">{{ confpwd_msg }}</span>
                          </v-flex>
                        </v-layout>

                        <v-flex mb-3>
                            <v-btn id="but" top depressed :class="{active: disable_btn}" :disabled="disable_btn" @click.prevent="send" type="submit" large style="border-radius: 4px">SUBMIT</v-btn>
                        </v-flex>
                    </v-container>
                  </v-form>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>

import axios from 'axios'

export default {
    data: () =>({
        valid: false,
        active: null,
        password: '',
        confpassword: '',
        pwd_msg: '',
        confpwd_msg: '',
        disable_btn: true,
       }),

    watch: {
      password: function(value) {
        if(this.check_password_length(value, 'pwd_msg', 6)) {
          this.check_passwords_match();
        }
      },

      confpassword: function(value) {
        if(this.check_password_length(value, 'confpwd_msg', 6)) {
          this.check_passwords_match();
        }
      }
    },   

    methods: {
      check_password_length(value, msg, total) {
        var length = value.length;
        var sum = 0;
        var display;
        
        sum = (total - length);
        
        switch(sum) {
            case 0:
            display = '';
            break;
            case 1:
            display = sum + ' more character to type';
            break;
            default:
            display = sum + ' more characters to type';
        }
        
        if(length >= total) {
            this[msg] = '';
            this.disable_btn = false;
            return true;
        } else {
            this[msg] = display;
            this.disable_btn = true;
            return false;
        }
        
        },
        
        check_passwords_match() {
        if(this.password.length > 5 && this.confpassword.length > 5) {
            if(this.confpassword != this.password) {
                this.confpwd_msg = 'Password Fields do not match';
                this.disable_btn = true;
                return true;
            } else {
                this.confpwd_msg = '';
                this.disable_btn = false;
                return false;
            }
            }
        },

       send () {
            if (this.$refs.form.validate()) {
            axios.post(`http://jsonplaceholder.typicode.com/posts`, {
                password: this.email,
                confpassword: this.confpassword
            })
            .then(response => {
            console.log(response)
            })
            .catch(e => { 
            })
            }
            this.password = '';
            this.confpassword = '';
            this.disable_btn = true;
        }
    }
}
</script>

<style scoped>
.card{
    border: solid lightgrey 1px;
    font-size: 16px;
}
.card__title{
    display: flex;
    justify-content: center;
    color: white;
    background-color: deepskyblue;
}
#but{
    border: solid deepskyblue 2px;
    color: deepskyblue;
    background-color: white;
}
#but:hover{
    color: white;
    background-color: deepskyblue;
}
.divider{
    border-bottom: solid lightgrey 1px;
}
/*For Everything in the input field*/
input{
    width: 100%;
    border-bottom: solid lightgray 1px;
    outline: none;
    padding: 20px 1px;
    margin: 10px;
} 
input:hover{
    border-bottom: solid black 1px;
}
input:focus{
    border-bottom: deepskyblue solid 2px;

} 
input::-webkit-input-placeholder {
    font-family: 'roboto', sans-serif;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}
input:focus::-webkit-input-placeholder, input:valid::-webkit-input-placeholder {
    color: deepskyblue;
    font-size: 11px;
    -webkit-transform: translateY(-20px);
    transform: translateY(-20px);
    visibility: visible !important;
}
span {
    font-size: .8em;
    color: red;
}  
/* span#characters {
    font-size: .8em;
    color: grey;
} */
</style>

