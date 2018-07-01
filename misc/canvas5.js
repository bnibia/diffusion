//sample of ctx.createImageData(cw, ch) at the end



var dA = 1;
var dB = 0.35;
var dT = 1;
var feed = 0.085;
var k = 0.062;


var grid;
var grid_bk;

var ctx, w, h;

var x, y, i,j;
var size = 1;
var rad;

window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");
    
	rad = Math.PI / 180;
	
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
        w = canvas.width = 400; 
        h = canvas.height = 400; 
        
        grid = [];
        grid_bk  = [];
        
        for(x=0, i=0;i<w;i+=size,x++)
        {    
            grid[x] = [];
            grid_bk[x] = [];
            
            for(y=0, j=0;j<h;j+=size,y++)
            {    
                grid[x][y] = { a: 1, b: 0};
                grid_bk[x][y] = { a: 1, b: 0};
            }
        }
        
        
        let aux = grid.length;  
		 
		for(i = 0; i < 360; i+=15)
		{
			for(j = 40; j < 50; j++)
			{
				let m = ~~((w/(size*2)) + j*Math.cos(i*rad));
				let n = ~~((h/(size*2)) + j*Math.sin(i*rad));
				grid[m][n].b = 1;
			}
		}
		
		
		
		window.requestAnimationFrame(draw);
    
    }

};


function normcor(c)
{
    if(c<0) return 0;
    if(c>255) return 255;
    return ~~c;
}

function color(c, d)
{
    
    let cortmp = ~~((c-d)*255);
    
    let rc = normcor(cortmp);
    let gc = normcor(cortmp);
    let bc = normcor(cortmp);
     
    let cor = "#" + ("00"+(rc).toString(16)).slice(-2) + 
                    ("00"+(gc).toString(16)).slice(-2) + 
                    ("00"+(bc).toString(16)).slice(-2);
                    
    return cor;
}


function swap()
{
    var temp = grid;
    grid = grid_bk;
    grid_bk = temp;
}


function constrain(val)
{
    var v = val > 1 ? 1 : val < 0 ? 0 : val;
    return v;
}


function draw()
{
    
    for(x=1, i=size;i<w-size;i+=size,x++)
    {    
        for(y=1, j=size;j<h-size;j+=size,y++)
        {
            let ax = grid[x][y].a;
            let bx = grid[x][y].b;
                        
            var newA = ax +
            ((dA * laplace(x, y, 0)) -
            (ax * bx * bx) +
            (feed * (1 - ax)))*dT;
            
            var newB = bx +
            ((dB * laplace(x, y, 1)) +
            (ax * bx * bx) -
            ((k + feed)*bx))*dT;
            
            grid_bk[x][y].a = constrain(newA);
            grid_bk[x][y].b = constrain(newB);
            
        }
    }

    //ctx.clearRect(0, 0, w, h);
    for(x=0,i=0;i<w;i+=size,x++)
    {    for(y=0,j=0;j<h;j+=size,y++)
        {
            ctx.fillStyle = color(grid_bk[x][y].a, grid_bk[x][y].b);
            ctx.fillRect(i, j, size, size);
        }
    }
    
    swap();
    
    window.requestAnimationFrame(draw);
        
}


function laplace(x, y, chem)
{
    var soma = 0;
	var diag = 0.05;
	var adjc = 0.2
	var mysf = -1;
    var row, col;
	
	for(let m=-1;m<2;m++)
	{	
		row = x+m;
		for(let n=-1;n<2;n++)
		{	col = y+n;
			
			//eu
			if(!m && !n)
			{
				if(chem) soma += grid[row][col].b * mysf;
				else soma += grid[row][col].a * mysf;
				continue;
			}				
			
			//diag
			if(m && n)
			{	
				if(chem) soma += grid[row][col].b * diag;
				else soma += grid[row][col].a * diag;
				continue;
			}				
		
			//adjc
			if(!m || !n)
			{
				if(chem) soma += grid[row][col].b * adjc;
				else soma += grid[row][col].a * adjc;
				continue;
			}
		}
	}
	
    return soma;
}


/*

function createImage(cw, ch)
{
	var imgData = ctx.createImageData(cw, ch);
	var pixels = imgData.data;
	for (var x = 1; x < cw - 1; x += 1) {
		for (var y = 1; y < ch - 1; y += 1) {
			//cor baseada em dois valores brutos
			var d = ~~((a - b) * 255);
			//cada pixel em escala azul
			var red = normalizeColor(55 - d);
			var green = normalizeColor(155 - d);
			var blue = normalizeColor(255 - d);

			var pix = (x + y * cw) * 4;
			pixels[pix + 0] = red;
			pixels[pix + 1] = green;
			pixels[pix + 2] = blue;
			pixels[pix + 3] = 255;
		}
	}
	ctx.putImageData(imgData, 0, 0);
}  
        

*/
 

 
 
 
 
