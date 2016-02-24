new Vue({
  el:'body',
  
  data:{
    rowA: [0,0,0],
    
    rowB: [0,0,0],
    
    rowC: [0,0,0], 
    
    X: 2, 
    
    O: 3, 
    
    compMove:false, 
  },
  
  methods:{
    
    clicked:function(rowId, colId)
    {
      this.addValuesToArray(rowId,colId); 
            
      this.runCompMoves(); 
      
      console.log("clicked "+rowId,colId);
    },
    
    addValuesToArray:function(rowId,colId)
    {
       if(rowId==='row-A'){ 
         
           if(this.cancelDuplicates(this.rowA,colId))
         {
            this.rowA.splice(colId-1,1,this.X); 
           
            this.drawTicOrTac('row-A',colId,'X'); 
           
             this.compMove=true; 
           
            console.log("added to array");   
         }
         
        
      }else if(rowId==='row-B')
      {
        if(this.cancelDuplicates(this.rowB,colId))
        {
          this.rowB.splice(colId-1,1,this.X);
          
          this.drawTicOrTac('row-B',colId,'X'); 
          
           this.compMove=true; 
          
        }
           
      }else{
        
        if(this.cancelDuplicates(this.rowC,colId))
        {
           this.rowC.splice(colId-1,1,this.X);
          
          this.drawTicOrTac('row-C',colId,'X'); 
          
           this.compMove=true; 
        }         
      } 
    },
    
    //draws either a X or O on the screen
    drawTicOrTac:function(row,colId,text)
    {
      $('#'+row+'>.col-md-4:nth-child('+colId+')').text(text);
    },
    
    cancelDuplicates:function(arrName,colId)
    {
       return arrName[colId-1]===this.X || arrName[colId-1]===this.O ? false : true; 
    },
    
    sumDiagonalA:function()
    {
      var sum= this.rowA[0]+this.rowB[1]+this.rowC[2]; 
      console.log("Diagonal sum A "+sum); 
      if(sum === this.X*3)
      {
         console.log("You win!");  
      }else if(sum === this.O*3)
      {
        console.log("You lose");
      }
      
      return sum; 
    },
    
    sumDiagonalB:function()
    {
      var sum= this.rowA[2]+this.rowB[1]+this.rowC[0]; 
      console.log("sum of Diagonal B "+sum);
      
       if(sum === this.X*3)
      {
         console.log("You win!");  
      }else if(sum === this.O*3)
      {
        console.log("You lose");
      }
      
      return sum; 
    },
    
    sumOfEachRow:function(arrName)
    {
       var sum = 0; 
      
      for (var i = arrName.length - 1; i >= 0; i--) 
      {
  			sum+=arrName[i]; 
  	  }
      
      return sum; 
    }, 
    
    keepCount:function()
    {
      var diagonalA = this.sumDiagonalA(); 
      var diagonalB = this.sumDiagonalB(); 
      var rowA = this.sumOfEachRow(this.rowA); 
      var rowB = this.sumOfEachRow(this.rowB);
      var rowC = this.sumOfEachRow(this.rowC);
      
      console.log("sum of diagonal A "+diagonalA);
      console.log("sum of diagonalB "+diagonalB);
      console.log("sum of rowA "+rowA);
      console.log("sum of rowB "+rowB);
      console.log("sum of rowC "+rowC);
    },
    
    sumOfColumns:function(colId)
    {
      return this.rowA[colId]+this.rowB[colId]+this.rowC[colId];
    
    },
    
    getZeroKeyFromArray:function(colId)
    {
        if(this.rowA[colId]===0)
        {
          return "row-A";
        }else if(this.rowB[colId]===0)
        {
          return "row-B";
        }else if(this.rowC[colId]===0)
        {
           return "row-C"; 
        }
    },
    
    compMoves:function()
    {
      console.log("calling comp first move function "+this.rowB[1]); 
      if(this.rowB[1]===0)
      {
        console.log("attempting to make a move"); 
        this.rowB.splice(1,1,this.O); 
        this.drawTicOrTac('row-B',2,'O'); 
        
      }else if(this.rowB[0]===0)
      {
        this.rowB.splice(0,1,this.O); 
        this.drawTicOrTac('row-B',1,'O'); 

      }else if(6-this.sumOfColumns(0)==2)
      {
        console.log("column a is closest to 6");
        
        this.watchColumns(1); 
      }else if(6-this.sumOfColumns(1)==2)
      {
        console.log("column b is closest to 6");

        this.watchColumns(2);  

      }else if(6-this.sumOfColumns(2)==2)
      {
        console.log("column b is closest to 6");

        this.watchColumns(3);  
      }
    }, 

    watchColumns:function(colId)
    {
        var column = this.getZeroKeyFromArray(colId-1);
        //console.log(column); 
        _temp = column.replace('-',''); 

        var index =colId -1; 

        if (_temp==='rowA') 
        {
          this.rowA.splice(index,1,this.O); 
          this.drawTicOrTac(column,colId,'0'); 
        }else if(_temp==='rowB')
        {
          this.rowB.splice(index,1,this.O); 
          this.drawTicOrTac(column,colId,'0'); 
        }else
        {
          this.rowC.splice(index,1,this.O);
          this.drawTicOrTac(column,colId,'0');  
        }
    },
    
    runCompMoves:function()
    {
       if(this.compMove)
       {
         this.compMoves(); 
       } 
    },
    
  },
  
  ready:function()
  {
    console.log("new vue ready."); 
  }
}); 