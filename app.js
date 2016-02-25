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
    
    //responds to user click
    clicked:function(rowId, colId)
    {
      this.addValuesToArray(rowId,colId); 
            
      this.runCompMoves(); 

      this.keepCount();
      
      console.log("clicked "+rowId,colId);
    },
    
    //adds an X if spot in array is blank
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
      $('#'+row+'>.col-xs-4:nth-child('+colId+')').text(text);
    },
    
    //finds pre existing values in array
    //other than 0
    cancelDuplicates:function(arrName,colId)
    {
       return arrName[colId-1]===this.X || arrName[colId-1]===this.O ? false : true; 
    },
    
    sumDiagonalA:function()
    {
      var sum= this.rowA[0]+this.rowB[1]+this.rowC[2]; 
      console.log("Diagonal sum A "+sum); 
      // if(sum === this.X*3)
      // {
      //    console.log("You win!");  
      // }else if(sum === this.O*3)
      // {
      //   console.log("You lose");
      // }
      
      return sum; 
    },
    
    sumDiagonalB:function()
    {
      var sum= this.rowA[2]+this.rowB[1]+this.rowC[0]; 
      console.log("sum of Diagonal B "+sum);
      
      //  if(sum === this.X*3)
      // {
      //    console.log("You win!");  
      // }else if(sum === this.O*3)
      // {
      //   console.log("You lose");
      // }
      
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
      var colA = this.sumOfColumns(0);
      var colB = this.sumOfColumns(1);
      var colC = this.sumOfColumns(2); 
      
      console.log("sum of diagonal A "+diagonalA);
      console.log("sum of diagonalB "+diagonalB);
      console.log("sum of rowA "+rowA);
      console.log("sum of rowB "+rowB);
      console.log("sum of rowC "+rowC);

      if (diagonalA === this.O*3 || 
          diagonalB===this.O*3 ||
          rowA === this.O*3||
          rowB === this.O*3 ||
          rowC === this.O*3 || 
          colA === this.O*3 ||
          colB === this.O*3 ||
          colC === this.O*3)
      {
        alert("You Lose! Computer Wins!"); 
        this.rowA=[0,0,0];
        this.rowB=[0,0,0];
        this.rowC=[0,0,0];
        this.compMove=false;
        this.clearTextFromBoard();
      }
    },

    clearTextFromBoard:function()
    {
      for (var i = 3; i > 0; i--) {
        $('#row-A>.col-xs-4:nth-child('+i+')').text('');
        $('#row-B>.col-xs-4:nth-child('+i+')').text('');
        $('#row-C>.col-xs-4:nth-child('+i+')').text('');
      };
        
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

    getZeroFromDiagonalA:function()
    {

      if (this.rowA[0]===0) 
      {
        return "row-A";
      }else if(this.rowB[1]===0)
      {
        return "row-B";
      }else if(this.rowC[2]===0)
      {
        return "row-C";
      }

    },

     getZeroFromDiagonalB:function()
    {
      if (this.rowA[2]===0) 
      {
        return "row-A";
      }else if(this.rowB[1]===0)
      {
        return "row-B";
      }else if(this.rowC[0]===0)
      {
        return "row-C";
      }

    },
    
    getZeroFromRow:function(arrName)
    {
      console.log("getting index of zero value"); 
      return arrName.indexOf(0); 
    },
    
    compMoves:function()
    {
      console.log("calling comp first move function "+this.rowB[1]); 

      if(this.rowB[1]===0)
      {
        console.log("attempting to make a move"); 
        this.rowB.splice(1,1,this.O); 
        this.drawTicOrTac('row-B',2,'O'); 
        
      }else if(9-this.sumOfEachRow(this.rowA) ==3)
      {
        this.watchRows('row-A',this.getZeroFromRow(this.rowA)); 
      }else if(9-this.sumOfEachRow(this.rowB) ==3)
      {
        this.watchRows('row-B',this.getZeroFromRow(this.rowB)); 
      }else if(9-this.sumOfEachRow(this.rowC) ==3)
      {
        this.watchRows('row-C',this.getZeroFromRow(this.rowC)); 
      }else if(9-this.sumOfColumns(0)==3)
      {
        console.log("column a is closest to 6");
        
        this.watchColumns(1);

      }else if(9-this.sumOfColumns(1)==3)
      {
       // console.log("column a is closest to 6");
        
        this.watchColumns(2);

      }else if(9-this.sumOfColumns(2)==3)
      {
       // console.log("column a is closest to 6");
        
        this.watchColumns(3);

      }else if(9-this.sumDiagonalA()==3)
      {
          this.watchDiagonalA();

      }else if(9-this.sumDiagonalB()==3)
      {
         this.watchDiagonalB(); 
      }else if(6-this.sumOfEachRow(this.rowA) ==2)
      {
        this.watchRows('row-A',this.getZeroFromRow(this.rowA)); 
      }else if(6 - this.sumOfEachRow(this.rowB) ==2)
      {
          this.watchRows('row-B',this.getZeroFromRow(this.rowB));
      }else if(6 - this.sumOfEachRow(this.rowC) == 2)
      {
        this.watchRows('row-C',this.getZeroFromRow(this.rowC));
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

      }else if(6-this.sumDiagonalA()==2)
      {
          this.watchDiagonalA();

      }else if(6-this.sumDiagonalB()==2)
      {
         this.watchDiagonalB(); 
      }else if(this.rowA[0]===0)
      {
        this.rowA.splice(0,1,this.O); 
        this.drawTicOrTac('row-A',1,'O'); 

      }else if(this.rowB[0]===0)
      {
        this.rowB.splice(0,1,this.O);
        this.drawTicOrTac('row-B',1,'O'); 

      }else if(this.rowA[this.getZeroFromRow(this.rowA)]===0)
      {
        this.watchRows('row-A',this.getZeroFromRow(this.rowA)); 
      }else if(this.rowB[this.getZeroFromRow(this.rowB)]===0)
      {
        this.watchRows('row-B',this.getZeroFromRow(this.rowB)); 
      }else if(this.rowC[this.getZeroFromRow(this.rowC)]===0)
      {
        this.watchRows('row-C',this.getZeroFromRow(this.rowC)); 
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

    watchDiagonalA:function()
    {
      var column = this.getZeroFromDiagonalA(); 
      console.log("diagonal a "+column); 
      var _temp = column.replace('-','');

      if (_temp==='rowA') 
      {
        this.rowA.splice(0,1,this.O);
        this.drawTicOrTac(column,1,'O');  
      }else if(_temp==='rowB')
      {
        this.rowB.splice(1,1,this.O); 
        this.drawTicOrTac(column,2,'O'); 
      }else if(_temp==='rowC')
      {
        this.rowC.splice(2,1,this.O);
        this.drawTicOrTac(column,3,'O');  
      }
    },

    watchDiagonalB:function()
    {
      var column = this.getZeroFromDiagonalB(); 

      var _temp = column.replace('-','');

      if (_temp==='rowA') 
      {
        this.rowA.splice(2,1,this.O);
        this.drawTicOrTac(column,3,'O');  
      }else if(_temp==='rowB')
      {
        this.rowB.splice(1,1,this.O); 
        this.drawTicOrTac(column,2,'O'); 
      }else if(_temp==='rowC')
      {
        this.rowC.splice(0,1,this.O);
        this.drawTicOrTac(column,1,'O');  
      }
    },

    watchRows:function(arrName, colId)
    {
      var _temp = arrName.replace('-','');

      if (_temp==='rowA') 
      {
        this.rowA.splice(colId,1,this.O);
        this.drawTicOrTac(arrName,colId+1,'O'); 

      }else if(_temp==='rowB')
      {
        this.rowB.splice(colId,1,this.O);
        this.drawTicOrTac(arrName,colId+1,'O'); 

      }else if(_temp==='rowC')
      {
        this.rowC.splice(colId,1,this.O);
        this.drawTicOrTac(arrName,colId+1,'O');  
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