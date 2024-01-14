import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FORM_FIELDS } from '@/lib/constants';
import { phoneRegex } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from "next/navigation";
import { updateUser } from '@/lib/actions/user.actions';
import useUserDataModal from '@/hooks/useUserDataModal';
import { useState } from 'react';
import useUserId from '@/hooks/useUserData';
import toast from 'react-hot-toast';

const formSchema = z.object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    address: z.string().min(3),
    email: z.string().email(),
    tel: z.string().regex(phoneRegex, 'Invalid number')
});

const UserForm = () => {
    const { userId } = useUserId();

    const {
        isOpen,
        onClose,
    } = useUserDataModal();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            address: '',
            email: '',
            tel: '',
        }
    });


const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('SUBMIT');

    try {
        setIsLoading(true);
        await updateUser({ userId: userId!, ...values });
        onClose()
        toast.success('Personal info was updated');
    } catch (error) {
        setIsLoading(false);
        toast.error('Something went wrong, please try again!')
        console.log(error, 'error in create/update user');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {FORM_FIELDS.map((el) => (
                    <FormField
                        key={el.label}
                        control={form.control}
                        name={el.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {el.label}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={el.placeholder}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}


                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                        variant='outline'
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        disabled={isLoading}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default UserForm