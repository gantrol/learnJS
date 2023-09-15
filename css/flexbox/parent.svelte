<style>
  parent {
    display: flex;
/* 		flex-direction: column; */
		justify-content: space-evenly;
  }
	child {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
/* 		justify-content: space-evenly; */
		
	}
	grandchild {
		border: 1px solid red;
	}
	.test {
		order: -1;
	}
</style>

<parent>
  <child>
    <grandchild>A1</grandchild> <grandchild class="test">A2</grandchild> <grandchild>A3</grandchild>
  </child>
  <child class="test">
    <grandchild>B1</grandchild> <grandchild>B2</grandchild> <grandchild>B3</grandchild>
  </child>
  <child>
    <grandchild>C1</grandchild> <grandchild>C2</grandchild> <grandchild>C3</grandchild>
  </child>
</parent>