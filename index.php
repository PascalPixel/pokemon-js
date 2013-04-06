<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="jquery.spritify-1.0.3.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
	   $('#character').spritify();
		});
</script>
<style type="text/css">  
  #stage {
	  position: relative;
	  width: 640px;
	  height: 480px;
	  margin: auto auto;
	  border: solid 2px #000;
	  overflow: hidden;
  }
</style>
</head>

<body>
<div id="stage">
  <div id="character"></div>
</div>
</body>
</html>