<template>
  <div class="modal-user-form">
    <md-dialog :md-active.sync="visibilityStatus">
      <md-dialog-title>
        {{ user ? "Edit user" : "Create user" }}
      </md-dialog-title>

      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
          <md-card-content>
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
              <span class="md-error" v-else-if="!$v.form.username.minlength">
                Invalid username
              </span>
            </md-field>

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

          <md-card-actions>
            <md-button :disabled="sending" type="submit" class="md-primary">
              Save
            </md-button>
          </md-card-actions>
        </md-card>
      </form>
    </md-dialog>

    <md-snackbar :md-active.sync="userSaved">
      The user {{ lastUser }} was saved with success!
    </md-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

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
        minLength: minLength(3),
        maxLength: maxLength(20)
      },
      email: {
        required,
        email
      }
    }
  },

  watch: {
    isVisible(visible) {
      if (visible && this.user) {
        this.fillForm();
      } else {
        this.clearForm();
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

    fillForm() {
      this.form.username = this.user.username;
      this.form.email = this.user.email;
    },

    async validateUser() {
      this.$v.$touch();
      if (this.$v.$invalid) return;

      try {
        this.sending = true;

        if (this.user) {
          await this.updateUser({
            id: this.user.id,
            username: this.form.username,
            email: this.form.email
          });
        } else {
          await this.addUser({
            username: this.form.username,
            email: this.form.email
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.lastUser = this.form.username;
        this.userSaved = true;
        this.sending = false;
        this.visibilityStatus = false;
        this.clearForm();
      }
    },

    clearForm() {
      this.$v.$reset();
      this.form.username = null;
      this.form.email = null;
    },

    ...mapActions("Users", ["addUser", "updateUser"])
  }
};
</script>