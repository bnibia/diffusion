
var dA = 1;
var dB =0.5;
var feed = 0.055;
var k = 0.062;


var grid;
var grid_bk;

var ctx, w, h;

var x, y, i,j;
var size =2;

window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");
    
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
        w = canvas.width; 
        h = canvas.height; 
        
        grid = [];
        grid_bk  = [];
        
        for(x=0, i=0;i<h;i+=size,x++)
        {    
            grid[x] = [];
            grid_bk[x] = [];
            
            for(y=0, j=0;j<w;j+=size,y++)
            {    
                grid[x][y] = { a: 1, b: 0};
                grid_bk[x][y] = { a: 1, b: 0};
            }
        }
        
        
        let aux = grid.length/2;
        
        for(i = aux;i<aux+5;i++)
        {    for(j =aux;j<aux+5;j++)
            {    grid[i][j].b = 1;
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
    
    
    let q = (c-d);
    let s = 255 + q*255;
    
    
    let cor = "#" + ("00"+(s).toString(16)).slice(-2) + 
                    ("00"+(s).toString(16)).slice(-2) + 
                    ("00"+(s).toString(16)).slice(-2);
                    
    return (cor);
}


function swap()
{
    var temp = grid;
    grid = grid_bk;
    grid_bk = temp;
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
    
    for(x=1, i=size;i<h-size;i+=size,x++)
    {    
        for(y=1, j=size;j<w-size;j+=size,y++)
        {
            let ax = grid[x][y].a;
            let bx = grid[x][y].b;
            
            let react = ax * bx * bx;
            
            let diff_a = dA * laplacian(x, y, 0);
            let diff_b = dB * laplacian(x, y, 1);
            let feed_a = feed * (1 - ax);
            let kill_b = (k + feed) * bx;
            
            var new_a = ax + (diff_a - react + feed_a)*1;
            var new_b = bx + (diff_b + react - kill_b)*1;
        
            //console.log(new_a, new_b);
            grid_bk[x][y].a = constrain(new_a);
            grid_bk[x][y].b = constrain(new_b);
        }
    }
    
    
    
    
    
    
    //ctx.clearRect(0, 0, w, h);
    for(x=0,i=0;i<h;i+=size,x++)
    {    for(y=0,j=0;j<w;j+=size,y++)
        {
            ctx.fillStyle = color(grid_bk[x][y].a, grid_bk[x][y].b);
            ctx.fillRect(i, j, size, size);
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
        suma += grid[x-1][y-1].b * 0.05;
        suma += grid[x-1][y].b * 0.2;
        suma += grid[x-1][y+1].b * 0.05;
        suma += grid[x][y-1].b * 0.2;
        suma += grid[x][y].b * (-1);
        suma += grid[x][y+1].b * 0.2;
        suma += grid[x+1][y-1].b * 0.05;
        suma += grid[x+1][y].b * 0.2;
        suma += grid[x+1][y+1].b * 0.05;
    }
    else
    {     
        suma += grid[x-1][y-1].a * 0.05;
        suma += grid[x-1][y].a * 0.2;
        suma += grid[x-1][y+1].a * 0.05;
        suma += grid[x][y-1].a * 0.2;
        suma += grid[x][y].a * (-1);
        suma += grid[x][y+1].a * 0.2;
        suma += grid[x+1][y-1].a * 0.05;
        suma += grid[x+1][y].a * 0.2;
        suma += grid[x+1][y+1].a * 0.05;
    }
    

    return suma;
}



        

 
 

 
 
 
 
