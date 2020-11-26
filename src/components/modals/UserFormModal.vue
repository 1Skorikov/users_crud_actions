<template>
  <div class="modal-user-form">
    <md-dialog :md-active.sync="visibilityStatus">
      <md-dialog-title>
        {{ user ? "Edit user" : "Create user" }}
      </md-dialog-title>

      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="first-name">Username</label>
                  <md-input
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    v-model="form.username"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.form.username.required">
                    The username is required
                  </span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form.username.minlength"
                  >
                    Invalid username
                  </span>
                </md-field>
              </div>
            </div>

            <!-- <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100"></div>

              <div class="md-layout-item md-small-size-100"></div>
            </div> -->

            <md-field :class="getValidationClass('email')">
              <label for="email">Email</label>
              <md-input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="form.email"
                :disabled="sending"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >The email is required</span
              >
              <span class="md-error" v-else-if="!$v.form.email.email"
                >Invalid email</span
              >
            </md-field>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />
        </md-card>

        <md-snackbar :md-active.sync="userSaved">
          The user {{ lastUser }} was saved with success!
        </md-snackbar>
      </form>

      <md-dialog-actions>
        <md-button class="md-primary" @click="visibilityStatus = false">
          Close
        </md-button>
        <md-button :disabled="sending" type="submit" class="md-primary">
          Save
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "UserFormModal",

  mixins: [validationMixin],

  props: {
    isVisible: {
      type: Boolean,
      required: true
    },

    user: {
      type: Object,
      default: null
    }
  },

  data: () => ({
    form: {
      username: null,
      email: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),

  computed: {
    visibilityStatus: {
      get() {
        return this.isVisible;
      },
      set() {
        this.$emit("update:isVisible", false);
      }
    }
  },

  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    clearForm() {
      this.$v.$reset();
      this.form.username = null;
      this.form.email = null;
    },

    saveUser() {
      this.sending = true;

      window.setTimeout(() => {
        this.lastUser = this.form.username;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },

    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
        this.visibilityStatus = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
