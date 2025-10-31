<script>
  import { onMount } from 'svelte';
  const headerIcons = {
    light : '/images/misc/_ico_day.png',
    dark : '/images/misc/_ico_night.png',
    pendulum : '/images/misc/_ico_dayNightPendulum.png',
  }

  let currentIcon = $state(headerIcons.light);
  let isSpinning = $state(false);

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const root = document.documentElement;
    const themeToApply = savedTheme ?? (prefersDark ? 'dark' : 'light');
    root.classList.toggle('dark', themeToApply === 'dark');

    currentIcon = themeToApply === 'dark' ? headerIcons.dark : headerIcons.light;   
  });

  function handleClick() {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    

    currentIcon = currentIcon === headerIcons.light ? headerIcons.dark : headerIcons.light;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

   function toggleIcon() {
    handleClick();
    isSpinning = true;
    setTimeout(() => (isSpinning = false), 600); // duration
    
  }
  
</script>

<header>

  <h1>ATL.LAB</h1>
  <h2>Choose your class and start dragging!</h2>
  
  
  <button onclick={toggleIcon} id="theme-toggle" aria-label="Toggle dark mode">
    <div class="icon-container">
      <!-- Theme icon -->
      <img src={currentIcon} id="theme-icon" alt="Toggle Theme">

      <!-- Spinning icon -->
      <img id="spinIco" class:spinning={isSpinning} src={headerIcons.pendulum} alt="">
    </div>
    
  </button>
  
</header>

<style>
  h1 {
    font-family: Roboto;
  }

  #theme-toggle {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    user-select: none;
  }

  .icon-container {
    position: relative;
    width: 64px;
    height: 64px;
  }

  #theme-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 32px;
    height: 32px;
    image-rendering: pixelated;
  }

  #spinIco {
    image-rendering: pixelated;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    z-index: 0;
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .spinning {
    animation: spin 0.6s ease-in-out;
  }
  
</style>
