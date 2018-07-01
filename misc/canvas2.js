
var dA = 1;
var dB =0.5;
var feed = 0.0367;
var k = 0.0649;


var grid0;
var grid1;

var ctx, w, h;

window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");
    
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
        w = canvas.width; 
        h = canvas.height; 
        
        grid0 = [];
        grid1 = [];
        
        for(let i=0;i<h;i++)
        {    
            grid0[i] = [];
            grid1[i] = [];
            
            for(let j=0;j<w;j++)
            {    
                grid0[i][j] = { a: 1, b: 0};
                grid1[i][j] = { a: 1, b: 0};
            }
        }
        
        
        for(let i = 70;i<110;i++)
        {    for(let j =70;j<110;j++)
            {    grid0[i][j].b = 1;
                //grid1[i][j].b = 1;
            }
        }
        
       window.requestAnimationFrame(draw);
    
    }

};


function color(c, d)
{
    
    //let v1 = Math.floor(255 - c*255);
    //let v2 = Math.floor(255 - d*255);
    //let v = v1 > v2 ? v1 : v2;
    
    //let p = c/4;
    //let l = ~(p);
    //let s = ~~(l*255);
    
    
  //  let q = d * 255;
    let s = 255 + d*255;
    
    
    let cor = "#" + ("00"+(s).toString(16)).slice(-2) + 
                    ("00"+(s).toString(16)).slice(-2) + 
                    ("00"+(s).toString(16)).slice(-2);
                    
    return (cor);
}


function swap()
{
    var temp = grid0;
    grid0 = grid1;
    grid1 = temp;
}


function constrain(val)
{
    //return Math.min(Math.max(value, 0), 1);
    var v = val > 1 ? 1 : val < 0 ? 0 : val;
    return v;
}
;



function draw()
{
    
    for(let i=1;i<h-1;i++)
    {    
        for(let j=1;j<w-1;j++)
        {
            let a1 = grid0[i][j].a;
            let b1 = grid0[i][j].b;
            
            let react = a1 * b1 * b1;
            
            let diff_a = dA * laplacian(i, j, 0);
            let diff_b = dB * laplacian(i, j, 1);
            let feed_a = feed * (1 - a1);
            let kill_b = (k + feed) * b1;
            
            var new_a = a1 + (diff_a - react + feed_a);
            var new_b = b1 + (diff_b + react - kill_b);
        
            //console.log(new_a, new_b);
            grid1[i][j].a = constrain(new_a);
            grid1[i][j].b = constrain(new_b);
        }
    }
    
    
    
    
    
    
    //ctx.clearRect(0, 0, w, h);
    for(let i=0;i<h;i++)
    {    for(let j=0;j<w;j++)
        {
            ctx.fillStyle = color(grid1[i][j].a, grid1[i][j].b);
            ctx.fillRect(i, j, 1, 1);
        }
    }
    
    swap();
    
    window.requestAnimationFrame(draw);
        
}


function laplacian(x, y, chem)
{
    var suma = 0;
    
    if(chem == 1)
    {    
        suma += grid0[x-1][y-1].b * 0.05;
        suma += grid0[x-1][y].b * 0.2;
        suma += grid0[x-1][y+1].b * 0.05;
        suma += grid0[x][y-1].b * 0.2;
        suma += grid0[x][y].b * (-1);
        suma += grid0[x][y+1].b * 0.2;
        suma += grid0[x+1][y-1].b * 0.05;
        suma += grid0[x+1][y].b * 0.2;
        suma += grid0[x+1][y+1].b * 0.05;
    }
    else
    {     
        suma += grid0[x-1][y-1].a * 0.05;
        suma += grid0[x-1][y].a * 0.2;
        suma += grid0[x-1][y+1].a * 0.05;
        suma += grid0[x][y-1].a * 0.2;
        suma += grid0[x][y].a * (-1);
        suma += grid0[x][y+1].a * 0.2;
        suma += grid0[x+1][y-1].a * 0.05;
        suma += grid0[x+1][y].a * 0.2;
        suma += grid0[x+1][y+1].a * 0.05;
    }
    

    return suma;
}



        

 
 

 
 
 
 
