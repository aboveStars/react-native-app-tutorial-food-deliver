import { supabase } from "@/src/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any[]) {
      const { error, data: newProduct } = await supabase
        .from("order_items")
        .insert(data)
        .select();

      if (error) {
        console.error(
          "Error on inserting new item to order_items: ",
          error.message
        );
        throw new Error(error.message);
      }

      return newProduct;
    },

    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orderItems"] });
    },
  });
};
