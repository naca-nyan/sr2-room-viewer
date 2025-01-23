<script lang="ts">
  let {
    checked = $bindable(),
    label,
  }: {
    checked: boolean;
    label?: string;
  } = $props();
</script>

<div class="flex">
  <label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider round"></span>
  </label>
  <small>{label}</small>
</div>

<style>
  :root {
    --move: 20px;
    --diameter: 18px;
    --margin: 4px;
    --height: calc(2 * var(--margin) + var(--diameter));
    --width: calc(var(--height) + var(--move));
  }
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: var(--diameter);
    width: var(--diameter);
    left: var(--margin);
    bottom: var(--margin);
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    transform: translateX(var(--move));
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: var(--height);
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .flex {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0 3px;
  }

  small {
    font-size: 0.8em;
  }
</style>
