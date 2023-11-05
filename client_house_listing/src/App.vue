<template>
  <div> 
  <header>
    <nav class="navbar">
      <img alt="Dtt logo" class="logo" src="@/assets/dtt_logo.png" width="125" height="125" />
        <div class="nav-links">
          <RouterLink to="/houses" 
          class="nav-router" :class="{active: $route.path === '/houses'}">Houses</RouterLink>
          <RouterLink to="/about"
          class="nav-router" :class="{active: $route.path === '/about'}">About</RouterLink>
        </div>
    </nav>    
  </header>
  <RouterView/>
  </div>
</template>


<script>
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      houses: [],
    };    
  },

  methods: {
    async getData() {
      try {
        const response = await axios.get(
          'https://api.intern.d-tt.nl/api/houses', {
      headers: {
        'X-Api-Key': import.meta.env.VITE_APP_API_KEY,
      },
    }
    );
    this.houses = response.data;
      } catch (error){
        console.log(error);
      }
    },    
  }, 

  created() {
    this.getData();
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
}

.nav-links .nav-router {
  display: flex;
  padding: 5px 10px;
  text-decoration: none;
  color: #C3C3C3;
  transition: 0.4s;
  font-weight: bold;
  font-size: 18px;
}

.nav-links .nav-router.active {
  color: #000000;
}

.logo {
  display: flex;
  margin-top: 10px;
  margin-left: 50px;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .navbar {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
  }

  .nav-links {
    flex-direction: column;
  }

  .nav-links .nav-router {
    padding: 10px 0;
  }

  .logo {
    margin: 10px 0;
  }
  
}
</style>
