<script>
    import {Input,Label} from 'flowbite-svelte'
    export let type = "text";
    export let name;
    export let value = "";
    export let placeholder = "";
    export let maxlength = undefined;
    export let onValidate = () => {};
  </script>
  
  <Label class="space">
    <span>{placeholder}</span>
    <Input 
      type={type} 
      name={name} 
      value={value} 
      maxlength={maxlength} 
      required
      placeholder={placeholder} 
      class="bg-white h-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      on:change={onValidate}
    />
  </Label>