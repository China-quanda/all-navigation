import { prisma } from "~/prisma"
export default defineEventHandler(async (event) => {
  // console.log('event',event)
  const body = await readBody(event);
  // await prisma.folder.create({
  //   data: {
  //     name: body.name,
  //     parentId: body.parentId
  //   },
  // });

  // await prisma.folder.update(
  //   {
  //     where: {
  //       id: body.id,
  //     },
  //     data: {
  //       name: body.name,
  //       parentId: body.parentId
  //     },
  //   }
  // )

  // const folders2 = await prisma.folder.findMany({
  //   include: {
  //     children: true,
  //   },
  // })

  // await prisma.folder.delete({
  //   where: {
  //     id: body.id,
  //   },
  // })

  const folders2 = await prisma.folder.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: {
            include:{
              children:{
                include:{
                  children:{
                    include:{
                      children: true // 递归地包含子类别
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  async function getFolders(folderId:number) {
    const node = await prisma.folder.findUnique({
      where: { id:folderId },
      include: {
        children: {
          include: {
            children: {
              include:{
                children:{
                  include:{
                    children:{
                      include:{
                        children: true // 递归地包含子类别
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  
    return node;
  }


  // console.log('folders2',folders2)
  return 'folders2'
  return {
    folders2,
    menus: await getFolders(9)
  }
})
